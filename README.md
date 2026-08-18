# Marketplace Rosarito

Marketplace inmobiliario: buscar, publicar y administrar propiedades en
Rosarito. Construido con Next.js (App Router) + TypeScript + Tailwind CSS.
Supabase (base de datos, autenticación y storage) se integrará en un paso
posterior.

## Requisitos

- Node.js 18.18 o superior (recomendado: la versión LTS más reciente)
- npm (viene incluido con Node.js)

## Cómo correr el proyecto en local

1. Instalar dependencias (solo la primera vez, o cuando cambie `package.json`):

   ```bash
   npm install
   ```

2. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

Los cambios que hagas en los archivos dentro de `src/` se reflejan
automáticamente en el navegador (hot reload), sin que tengas que reiniciar
el servidor.

### Otros comandos útiles

```bash
npm run build   # compila la versión de producción
npm run start   # corre esa versión compilada (después de build)
npm run lint    # revisa el código en busca de errores comunes
```

## Estructura del proyecto

```
src/
  app/                  Rutas del sitio (cada carpeta = una URL)
    page.tsx            Home + buscador principal            -> /
    propiedades/
      page.tsx           Listado y búsqueda de propiedades    -> /propiedades
      [id]/page.tsx       Ficha de una propiedad               -> /propiedades/123
    publicar/page.tsx    Formulario para publicar propiedad   -> /publicar
    perfil/page.tsx      Perfil del usuario                   -> /perfil
    panel/
      propietario/page.tsx  Panel del propietario              -> /panel/propietario
      admin/page.tsx         Panel de administración            -> /panel/admin
    mensajes/page.tsx    Mensajería entre usuarios            -> /mensajes
    login/page.tsx       Inicio de sesión                     -> /login
    layout.tsx           Layout raíz (navbar + footer, envuelve todas las páginas)
    globals.css          Estilos globales de Tailwind

  components/
    layout/              Navbar, Footer y otros bloques de layout
    property/            Componentes relacionados a propiedades (tarjetas, galería, etc.)
    ui/                  Componentes genéricos reutilizables (botones, inputs, etc.)

  lib/                   Funciones auxiliares y, más adelante, el cliente de Supabase
  types/                 Tipos de TypeScript compartidos (Property, UserProfile, etc.)
  hooks/                 Custom hooks de React
  config/                Configuración del sitio (nombre, navegación, etc.)
```

**Por qué esta estructura:** en Next.js App Router, cada carpeta dentro de
`app/` se convierte automáticamente en una URL. Por eso `app/publicar/`
es la página `/publicar`. Todo lo que no es "una página" (componentes,
tipos, funciones de ayuda) vive fuera de `app/`, en `components/`, `lib/`,
`types/`, etc. Esto evita que `app/` se llene de archivos que no son rutas
y hace más fácil encontrar las cosas cuando el proyecto crezca.

## Supabase

El proyecto ya está conectado a Supabase (`@supabase/supabase-js` +
`@supabase/ssr`). Las credenciales viven en `.env.local` (que **no** se
sube al repositorio — está en `.gitignore`). Si clonas este proyecto en
otra máquina, copia `.env.local.example` a `.env.local` y pon ahí tus
propias credenciales.

Hay dos formas de crear el cliente, según dónde corra el código:

- `src/lib/supabase/client.ts` — para Client Components (`"use client"`, código en el navegador)
- `src/lib/supabase/server.ts` — para Server Components, Server Actions y Route Handlers (código en el servidor)

### Esquema de la base de datos

Las 6 tablas ya están creadas en Supabase (definidas en
[`supabase/migrations/20260815000000_create_marketplace_schema.sql`](supabase/migrations/20260815000000_create_marketplace_schema.sql)):

| Tabla | Qué guarda |
|---|---|
| `users` | Perfil de cada persona registrada (rol, si está verificada), ligado a `auth.users` |
| `listing_groups` | Zona/fraccionamiento declarado por un dueño |
| `listings` | Cada predio individual (folio, precio, m², estatus) |
| `leads` | Cada contacto de un comprador hacia un listing |
| `verifications` | Documentos de propiedad subidos por listing, con estatus de revisión |
| `listing_status_history` | Bitácora de cada cambio de estatus de un listing |

Las políticas de acceso (quién puede leer/escribir cada fila) están en
[`supabase/migrations/20260815010000_add_rls_policies.sql`](supabase/migrations/20260815010000_add_rls_policies.sql).
En resumen:

- `users`: cada quien ve y edita solo su propio perfil (sin poder tocar
  su propio `role` ni `is_verified`); admin ve/edita todos.
- `listing_groups`: visibles para cualquiera; el dueño edita las suyas
  (sin poder reasignar el `owner_id`); admin edita todas.
- `listings`: públicos solo si (a) tienen `status` en `'disponible'`,
  `'apartado'` o `'vendido'`, **y** (b) no requieren verificación o ya
  tienen una aprobada. `'borrador'` nunca es público. `'vendido_fuera'`
  tampoco — es el único estatus que se oculta a propósito, porque ya no
  representa una oportunidad de compra real y es el caso que se rastrea
  por posible pérdida de comisión. `'vendido'` (vendido **en** la
  plataforma) sí se deja visible a propósito, como prueba social de que
  la plataforma sí concreta ventas — decisión de negocio desde el inicio
  del proyecto, documentada aquí para no perderla de nuevo. El dueño
  ve/edita los suyos (sin poder tocar `requires_verification`); admin
  ve/edita todos.
- `leads`: cualquier usuario autenticado puede crear uno sobre sí mismo;
  lo ve el comprador, el dueño del listing, y admin.
- `verifications`: el dueño sube documentos para sus listings; **solo
  admin** puede aprobar/rechazar (el dueño nunca puede auto-aprobarse).
- `listing_status_history`: solo lectura directa — nadie puede insertar
  filas a mano. Se llena únicamente a través de la función
  `update_listing_status()` (ver "Panel de propietario" más abajo).

Nadie puede borrar filas desde la app (ni dueños ni compradores) — solo
tú, manualmente, desde el dashboard de Supabase. **Excepción:** las fotos
de propiedades (`listing_photos`, ver abajo) sí las puede borrar el dueño.

### Fotos de propiedades

Tabla `listing_photos` + bucket de Storage `listing-photos` (definidos en
[`supabase/migrations/20260815030000_add_listing_photos.sql`](supabase/migrations/20260815030000_add_listing_photos.sql)):

- `listing_photos`: `listing_id`, `storage_path` (ruta dentro del bucket,
  no la URL completa), `position` (orden en la galería, `0` = portada).
- Bucket público para lectura (5MB máx, solo `image/jpeg|png|webp`) — la
  ruta de cada archivo solo se descubre a través de `listing_photos`, que
  tiene las mismas reglas de visibilidad que `listings`.
- Convención de ruta: `{listing_id}/{uuid}.{ext}`.
- El dueño sube/borra fotos de sus propios listings; admin ve/borra todo.

### Registro de usuarios

Cuando alguien se registra, un trigger (en
[`supabase/migrations/20260815020000_add_signup_trigger.sql`](supabase/migrations/20260815020000_add_signup_trigger.sql))
crea automáticamente su fila en `public.users`. Para que funcione, el
formulario de registro debe mandar `full_name` y `role` en el `signUp()`:

```ts
supabase.auth.signUp({
  email,
  password,
  options: {
    data: { full_name: "Nombre completo", role: "comprador" }, // particular | desarrolladora | agente | comprador
  },
});
```

**Importante:** `'admin'` nunca debe ser una opción seleccionable en el
formulario público — el trigger la rechaza aunque alguien intente
mandarla directo a la API (fuera del formulario), así que ni siquiera
manipulando la petición se puede uno auto-asignar admin. Ese rol solo se
asigna a mano desde el dashboard de Supabase.

### Confirmación de correo

El registro requiere confirmar el correo (`mailer_autoconfirm: false` en
el proyecto). El flujo completo:

1. `supabase.auth.signUp()` crea la cuenta y manda un correo.
2. El link del correo apunta a `/auth/confirm` en tu app (configurado en
   la plantilla "Confirm signup" del dashboard, usando `token_hash` en
   vez del link genérico de Supabase — funciona aunque abras el correo en
   otro dispositivo).
3. [`src/app/auth/confirm/route.ts`](src/app/auth/confirm/route.ts)
   recibe ese link, llama `verifyOtp()`, y ahí sí queda la sesión activa.

Configuración necesaria en el dashboard (Authentication → URL
Configuration): Site URL = `http://localhost:3000`, Redirect URLs incluye
`http://localhost:3000/**`. Y en Authentication → Email Templates →
Confirm signup, el link debe ser
`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/`.

### Olvidé mi contraseña

Reutiliza toda la infraestructura de arriba — no hay ruta nueva para
recibir el link del correo, porque
[`/auth/confirm/route.ts`](src/app/auth/confirm/route.ts) ya estaba
escrito de forma genérica (acepta cualquier `type` de Supabase, no solo
`'email'`).

1. En `/login`, modo "Iniciar sesión", el link "¿Olvidaste tu
   contraseña?" cambia a un modo `forgot` (mismo componente, mismo
   `useState`) que solo pide el correo y llama
   `supabase.auth.resetPasswordForEmail(email)`.
2. El link del correo apunta a `/auth/confirm?token_hash=...&type=recovery&next=/nueva-contrasena`
   — mismo `verifyOtp()` de siempre, pero con `type=recovery`, que deja
   una sesión activa y redirige a `/nueva-contrasena`.
3. [`/nueva-contrasena`](src/app/nueva-contrasena/page.tsx) (ruta
   protegida en `proxy.ts` — nadie llega sin pasar por el link del
   correo) pide la contraseña nueva dos veces y llama
   `supabase.auth.updateUser({ password })`.

**Por qué hace falta SMTP propio para esto:** el dashboard de Supabase no
deja editar el HTML de las plantillas de correo (necesario para meter
`{{ .TokenHash }}`) sin configurar tu propio SMTP primero — su servicio
de correo compartido solo sirve para la plantilla default, sin edición.
Elegimos **Resend** como proveedor (Project Settings → Authentication →
SMTP Settings en Supabase, host `smtp.resend.com`).

**Limitación actual (temporal):** todavía no tenemos dominio propio
verificado en Resend, así que el remitente es `onboarding@resend.dev` —
esa dirección **solo entrega a la cuenta con la que te registraste en
Resend** (tu cuenta admin, `marquez04.33t@gmail.com`). Las cuentas de
prueba con alias (`+test1`, `+test2`) no van a recibir estos correos
todavía. Cuando haya un dominio propio, hay que verificarlo en Resend
para poder mandar a cualquier dirección — pendiente, sin bloquear el
resto del desarrollo mientras tanto.

Configuración necesaria en el dashboard (Authentication → Email
Templates → **Reset Password**), el mismo patrón que "Confirm signup":
`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/nueva-contrasena`.

### Sesión y `proxy.ts`

[`src/proxy.ts`](src/proxy.ts) (el archivo que en versiones viejas de
Next.js se llamaba `middleware.ts`) corre antes de cada request y
refresca el access token de Supabase usando el refresh token cuando hace
falta, para que la sesión no expire sola cada ~1 hora. La lógica vive en
[`src/lib/supabase/middleware.ts`](src/lib/supabase/middleware.ts).

Además de refrescar la sesión, protege rutas privadas: `/perfil`,
`/panel/propietario`, `/panel/admin`, `/publicar` y `/mensajes` exigen
sesión (si no hay, redirige a `/login?next=<ruta>` y regresa ahí después
de iniciar sesión). `/panel/admin` además exige `role = 'admin'` — si no,
redirige a home.

El Navbar ([`src/components/layout/navbar.tsx`](src/components/layout/navbar.tsx))
es un Server Component: lee la sesión en cada request y muestra el
nombre del usuario + botón "Cerrar sesión" (una Server Action en
[`src/app/actions/auth.ts`](src/app/actions/auth.ts)), o "Iniciar sesión"
si no hay sesión.

### Verificar que la conexión funciona

```bash
curl "https://reuqpjxxncnxmhaxwrok.supabase.co/auth/v1/settings" \
  -H "apikey: TU_ANON_KEY"
```

Si responde con un JSON (configuración de autenticación del proyecto) y
código `200`, la URL y la key son correctas. Ya lo probé y funciona.

## Estado actual

- [x] Proyecto Next.js + TypeScript + Tailwind inicializado
- [x] Estructura de carpetas para las páginas principales
- [x] Conexión con Supabase (cliente configurado)
- [x] 6 tablas creadas (`users`, `listing_groups`, `listings`, `leads`, `verifications`, `listing_status_history`)
- [x] Políticas de RLS (quién puede leer/escribir cada tabla)
- [x] Trigger para crear la fila en `public.users` al registrarse
- [x] Página real de `/login` (crear cuenta + iniciar sesión, con las 4 tarjetas de rol, sin admin)
- [x] Ruta `/auth/confirm` para completar el login tras confirmar el correo
- [x] `src/proxy.ts` — refresca la sesión en cada request
- [x] Configuración del dashboard de Supabase (Site URL, Redirect URLs, plantilla de correo) — confirmada funcionando de punta a punta
- [x] Navbar refleja sesión activa (nombre + cerrar sesión)
- [x] Rutas protegidas + `/panel/admin` exige `role = 'admin'` — confirmado con cuentas de prueba
- [x] Tabla `listing_photos` + bucket de Storage `listing-photos` con políticas
- [x] Esquema de `listings` ampliado para el flujo de publicar: `description`, `latitude`/`longitude`, campos opcionales, estatus `'borrador'`
- [x] Publicar — Paso 0 (`/publicar`): elige zona existente o crea una nueva; bloqueado para `comprador`/`admin`
- [x] Publicar — Paso 1 (`/publicar/nueva-zona`): crea la zona y sus N predios en `'borrador'` (función atómica `create_listing_group_with_drafts`)
- [x] Publicar — Paso 2 (`/publicar/predio/[listingId]`): completa un predio (folio, tipo, operación, precio, m², descripción, mapa con Leaflet, fotos) y lo pasa de `'borrador'` a `'disponible'`
- [x] Publicar — Paso 3 (`/publicar/predio/[listingId]/verificar`): sube documento(s) de verificación; 4 estados (sin enviar / pendiente / rechazado / aprobado)
- [x] Panel de admin (`/panel/admin`): aprueba/rechaza verificaciones agrupadas por predio, con URL firmada para ver cada documento
- [x] `/propiedades` (buscador con filtros) y ficha de propiedad (`/propiedades/[id]`) con galería, mapa de solo lectura, y botón "Contactar" que crea un `lead`
- [x] **Primer predio real, verificado y público, confirmado de punta a punta** (folio ZP-05L)
- [x] Panel de propietario (`/panel/propietario`): todos los predios del dueño en un solo lugar, con selector rápido de estatus, sección de contactos (leads) con teléfono protegido bajo demanda, y visor del historial de estatus
- [x] Navbar con links según rol ("Mi panel" para dueños, "Admin" para admin)
- [x] "Olvidé mi contraseña" (`/nueva-contrasena`)
- [x] `/perfil`: editar nombre y teléfono, ver rol/verificación/fecha de registro, link a cambiar contraseña
- [ ] Mensajería (`/mensajes` — sigue siendo placeholder)

### Paso 2: completar un predio

[`src/app/publicar/predio/[listingId]/page.tsx`](<src/app/publicar/predio/[listingId]/page.tsx>)
+ [`predio-form.tsx`](<src/app/publicar/predio/[listingId]/predio-form.tsx>).
Puntos técnicos a recordar:

- El mapa usa **Leaflet + OpenStreetMap** (gratis, sin API key), centrado
  por default en Rosarito, B.C. Se carga con `next/dynamic` y
  `ssr: false` porque Leaflet necesita `window`, que no existe en el
  servidor.
- El guardado es una sola Server Action
  ([`src/app/actions/listings.ts`](src/app/actions/listings.ts)): valida
  los campos, actualiza el `listing` (pasa a `'disponible'`), sube cada
  foto al bucket `listing-photos` y crea su fila en `listing_photos`.
- Si el folio ya existe en otro listing, se muestra un error claro (la
  restricción `unique` de la base de datos lo bloquea).
- La página no hace ninguna verificación manual de "¿es tuyo este
  predio?" — se apoya en RLS: si no te pertenece, la consulta
  simplemente no devuelve nada y se muestra 404.

### Paso 3: subir verificación

[`src/app/publicar/predio/[listingId]/verificar/page.tsx`](<src/app/publicar/predio/[listingId]/verificar/page.tsx>)
+ [`verificacion-form.tsx`](<src/app/publicar/predio/[listingId]/verificar/verificacion-form.tsx>)
+ [`src/app/actions/verifications.ts`](src/app/actions/verifications.ts).

- Bucket **privado** `verification-documents` (a diferencia de
  `listing-photos`, que es público) — solo el dueño y un admin pueden
  acceder, vía su propia sesión.
- Acepta PDF, JPG o PNG, hasta 10MB por archivo. Se pueden subir varios
  a la vez (ej. escritura + identificación) — cada uno crea su propia
  fila en `verifications`, todas en `'pendiente'`.
- La pantalla tiene 4 estados según la verificación más reciente de ese
  predio: sin enviar (muestra el formulario), pendiente (sin formulario,
  para evitar envíos duplicados), rechazado (muestra `rejection_reason`
  + el formulario de nuevo), o aprobado (mensaje de éxito).
- Todavía no hay forma de que una verificación pase a `'aprobado'` —
  eso requiere el panel de admin, que sigue pendiente.

### Panel de admin: aprobar/rechazar verificaciones

[`src/app/panel/admin/page.tsx`](src/app/panel/admin/page.tsx) +
[`verification-review-card.tsx`](src/app/panel/admin/verification-review-card.tsx)
+ [`src/app/actions/admin-verifications.ts`](src/app/actions/admin-verifications.ts).

- Lista las verificaciones `'pendiente'`, **agrupadas por predio** (no
  por fila) — si un predio tiene varios documentos, se aprueban o
  rechazan todos juntos, para que no quede visible al público con solo
  la mitad de su documentación aprobada.
- Cada documento se ve mediante una **URL firmada temporal** (~10 min,
  generada al cargar la página) — el bucket es privado, no hay URLs
  públicas permanentes.
- Al aprobar/rechazar no se toca la tabla `listings` — la visibilidad
  pública ya es automática por la política RLS que existe
  (`listing_has_approved_verification`).

### `/propiedades` y ficha de propiedad

[`src/app/propiedades/page.tsx`](src/app/propiedades/page.tsx) (listado
con filtros de operación/tipo/zona vía query params) y
[`src/app/propiedades/[id]/page.tsx`](<src/app/propiedades/[id]/page.tsx>)
(ficha completa: galería, precio, descripción, mapa de solo lectura con
Leaflet, botón "Contactar").

- No hay ningún filtro manual de "solo mostrar aprobados" en el código
  — no hace falta: como estas páginas consultan `listings` sin sesión
  de dueño/admin, RLS ya solo devuelve lo que es público.
- El botón "Contactar" crea una fila en `leads` (exige sesión — si no
  hay, redirige a `/login?next=<ficha>` y regresa ahí después de
  entrar). Un `unique (listing_id, buyer_id)` en la base evita leads
  duplicados del mismo comprador sobre el mismo predio.
- El botón se **oculta por completo si `status = 'vendido'`** (ya no hay
  nada que preguntar). Si está `'apartado'` se deja activo y sin ningún
  aviso especial — el trato todavía se puede caer, así que tiene sentido
  que alguien más muestre interés.

### Panel de propietario

[`src/app/panel/propietario/page.tsx`](src/app/panel/propietario/page.tsx) +
[`owner-listing-row.tsx`](src/app/panel/propietario/owner-listing-row.tsx) +
[`src/app/actions/listing-status.ts`](src/app/actions/listing-status.ts).

- Lista **todos** los predios del dueño, de todas sus zonas, con su
  estatus y el estado de su verificación.
- "Completar"/"Editar" reutiliza la misma pantalla del Paso 2
  (`/publicar/predio/[listingId]`). Antes de conectarla al panel, esa
  pantalla forzaba el estatus a `'disponible'` en cada guardado y exigía
  subir una foto nueva siempre — bien para completar un borrador, pero
  hubiera revertido silenciosamente el estatus de un predio ya
  `'vendido'` al solo corregir un dato. Se ajustó: el estatus solo se
  toca automáticamente si el predio venía de `'borrador'`; si ya tiene
  fotos, subir una nueva es opcional.
- **Selector rápido de estatus** (disponible / apartado / vendido /
  vendido fuera de la plataforma), sin pasar por el formulario completo.
  Al marcar **"vendido fuera de la plataforma"**, pide un motivo
  obligatorio (Vendido en la plataforma / Vendido por fuera / Ya no
  disponible / Otro) — es la pieza central de la protección de comisión,
  así que no puede ser un cambio sin fricción.
- Todo el cambio de estatus pasa por una sola función de base de datos,
  `update_listing_status()` (`security definer`, mismo patrón que
  `is_admin()`): valida que quien llama sea el dueño del predio o un
  admin, exige el motivo cuando aplica, actualiza `listings` **y**
  registra la fila en `listing_status_history` en la misma transacción.
  Por eso `listing_status_history` no tiene política de INSERT abierta:
  solo se llena a través de esta función controlada, nunca a mano.
- Decidimos **no** construir el "Paso 4" (resumen de zona) que estaba en
  el plan original — `/publicar` ya muestra ese mismo resumen de
  progreso por zona, así que hubiera sido una pantalla duplicada.

### Panel de propietario: contactos (leads) por predio

[`lead-contact.tsx`](src/app/panel/propietario/lead-contact.tsx) +
la Server Action `revealBuyerPhone` en
[`src/app/actions/leads.ts`](src/app/actions/leads.ts) +
migración
[`20260817000000_add_owner_view_buyer_profile_policy.sql`](supabase/migrations/20260817000000_add_owner_view_buyer_profile_policy.sql).

- Cada predio (no borrador) tiene una sección plegable "Contactos (N)"
  con quién le mandó un `lead`: nombre, correo, teléfono y fecha.
- **Nueva política de RLS en `users`**, necesaria porque antes un dueño
  no podía ver el perfil de nadie más que el suyo: ahora puede ver el
  perfil de un comprador **únicamente si ese comprador ya le generó un
  lead** — no abre visibilidad general de usuarios, solo la relación
  puntual dueño↔comprador que ya contactó.
- **El teléfono se protege de verdad, no solo visualmente.** La carga
  inicial de `/panel/propietario` nunca incluye el teléfono completo —
  el servidor lo enmascara (`maskPhone()` en
  [`page.tsx`](src/app/panel/propietario/page.tsx)) antes de mandarlo al
  navegador, así que ni viendo el código fuente ni el payload de React
  Server Components se puede sacar el número completo. El botón "Ver
  teléfono completo" dispara `revealBuyerPhone()`, una Server Action
  aparte que sí consulta el teléfono real, protegida por la misma
  política de RLS de arriba.
- El correo sí se muestra completo desde la carga inicial (decisión
  explícita: solo el teléfono necesitaba esta protección extra).

### Panel de propietario: historial de estatus

Sección plegable "Historial (N)" en cada predio (mismo patrón que
"Contactos"), con cada cambio de estatus: estatus nuevo, motivo (si
aplica) y fecha — usa lo que ya guarda `update_listing_status()` en
`listing_status_history`.

El primer paso de `'borrador'` a `'disponible'` (al completar el predio
por primera vez en el Paso 2) también pasa por `update_listing_status()`
— [`listings.ts`](src/app/actions/listings.ts) ya no pone el estatus
directo con `.update()`, llama a la misma función RPC que usa el
selector del panel. Así el historial queda completo desde la primera
publicación, no solo desde el segundo cambio de estatus. (Nota: los
predios que ya existían antes de este ajuste no tienen esa primera
entrada retroactiva — la bitácora solo registra cambios hacia adelante.)

### `/perfil`

[`perfil-form.tsx`](src/app/perfil/perfil-form.tsx) +
[`src/app/actions/profile.ts`](src/app/actions/profile.ts).

- Editable: nombre completo, teléfono. Solo lectura: correo, rol,
  identidad verificada, fecha de registro.
- **El correo es de solo lectura a propósito.** `public.users.email` es
  solo una copia del correo real de autenticación
  (`auth.users.email`) — cambiarlo aquí lo desincronizaría de tu correo
  de login real. Cambiar el correo de verdad necesita el flujo de
  confirmación de Supabase (`updateUser({ email })`) y no hay ningún
  trigger que sincronice ese cambio de vuelta a `public.users.email` —
  queda pendiente como su propia pieza, no se construyó.
- El teléfono se valida (cliente y servidor) a solo dígitos, 7 a 15 —
  se usa para contacto real con compradores.
- "Cambiar contraseña" enlaza a `/login?mode=forgot&email=tu@correo` —
  reutiliza el flujo de recuperación que ya existía, con el correo
  precargado, sin tener que cerrar sesión.
- `role` e `is_verified` no son editables aquí — ni falta hace agregar
  esa restricción a mano, la política de RLS
  (`Users can update their own basic info`) ya rechaza cualquier intento
  de cambiarlos, incluso si alguien manipulara la petición directo.

### Cuatro bugs reales que ya se corrigieron (vale la pena conocerlos)

1. **Límite de tamaño de las Server Actions.** Next.js rechaza por
   default cualquier envío de más de 1MB — una foto normal lo excede.
   Se subió a 15MB en `next.config.ts` (`experimental.serverActions.bodySizeLimit`),
   se agregó validación del lado del cliente (rechaza fotos de más de
   5MB antes de enviar, con mensaje claro), y un
   [`error.tsx`](<src/app/publicar/predio/[listingId]/error.tsx>) para
   que cualquier falla inesperada siempre muestre un mensaje en pantalla.
2. **Caché de rutas después de una Server Action.** Crear una zona o
   completar un predio no actualizaba lo que se veía en `/publicar` —
   los datos sí se guardaban, pero Next.js seguía mostrando una versión
   en caché de la página. Se corrigió agregando `revalidatePath("/publicar")`
   en ambas Server Actions
   ([`listing-groups.ts`](src/app/actions/listing-groups.ts),
   [`listings.ts`](src/app/actions/listings.ts)) antes de redirigir.
3. **Recursión infinita en políticas de RLS (código 42P17).** La
   política de `listings` consultaba `verifications`, y la política de
   `verifications` consultaba de vuelta `listings` — ciclo infinito.
   Se corrigió con una función `security definer`
   (`listing_has_approved_verification`, mismo patrón que `is_admin()`)
   que rompe el ciclo — ver
   [`20260815070000_fix_listings_verifications_rls_recursion.sql`](supabase/migrations/20260815070000_fix_listings_verifications_rls_recursion.sql).
4. **Las políticas públicas nunca revisaban el estatus.** "Público puede
   ver listings verificados" solo checaba la verificación aprobada, sin
   importar el `status` del predio. No causaba problemas todavía porque
   no existía forma de cambiar el estatus de un predio ya público — pero
   al construir el selector rápido de estatus del panel de propietario,
   un predio marcado como `'borrador'` (nunca debe ser público) o
   `'vendido_fuera'` (ya no es una oportunidad real) habría seguido
   apareciendo en `/propiedades` como si estuviera disponible. Se
   corrigió agregando `status in ('disponible', 'apartado', 'vendido')`
   como condición en ambas políticas (`listings` y `listing_photos`) —
   ver
   [`20260816000000_add_status_history_function.sql`](supabase/migrations/20260816000000_add_status_history_function.sql).

## Próximos pasos

1. Cuando haya un dominio propio para Ulotty: verificarlo en Resend para
   que el correo de recuperación de contraseña (y cualquier otro) llegue
   a cualquier cuenta, no solo a la de admin.
2. Diseño real de mensajería (`/mensajes`).
3. (Deferido, sin fecha) Lightbox de fotos en la ficha de propiedad.
4. (Deferido, sin fecha) Perímetro del predio como polígono en el mapa
   en vez de un solo pin — necesita cambios de esquema y una herramienta
   de dibujo.
