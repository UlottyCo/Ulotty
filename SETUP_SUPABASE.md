# Setup Supabase - Guía Rápida

## ⚠️ Necesitas ejecutar el schema SQL una sola vez

Sigue estos pasos para configurar Supabase:

### Opción 1: Via Supabase Console (Recomendado)

1. Ve a: https://app.supabase.com
2. Inicia sesión con tu cuenta
3. Selecciona el proyecto "Ulotty"
4. Ve a **SQL Editor** (en el sidebar)
5. Click en **New Query**
6. Copia TODO el contenido de `database/schema.sql`
7. Pégalo en el SQL Editor
8. Click en **Run** (o Ctrl+Enter)
9. Espera a que termine (verás "Command executed successfully")

### Opción 2: Via CLI

```bash
npm run setup:db
```

**Nota:** El script automático aún está siendo configurado.

---

## 🎯 Después del Setup

Una vez que ejecutes el schema SQL:

1. Las tablas se crearán automáticamente en Supabase
2. Luego ejecuta este comando para cargar datos de prueba:

```bash
cd "Desktop/Proyecto Ulotty/001-Archivos proyecto Ulotty"
NEXT_PUBLIC_SUPABASE_URL="https://reuqpjxxncnxmhaxwrok.supabase.co" \
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_-Cd2Xsue0OU_ObElRsjZXw_ptOyZj7u" \
npx tsx scripts/setup-db.ts
```

3. Abre http://localhost:3000/panel-admin/propiedades
4. ¡Deberías ver 5 propiedades en la tabla!

---

## 📝 Contenido del Schema

El schema.sql contiene:
- ✅ Tabla `profiles` - Usuarios del sistema
- ✅ Tabla `properties` - Propiedades inmobiliarias
- ✅ Tabla `operations` - Operaciones/transacciones
- ✅ Tabla `commissions` - Comisiones de agentes
- ✅ Tabla `notifications` - Notificaciones
- ✅ Tabla `audit_logs` - Registro de auditoría

---

## ✅ Verificación

Después de ejecutar el schema, verifica:

```sql
-- Ejecuta esto en Supabase SQL Editor para verificar
SELECT * FROM pg_tables WHERE schemaname = 'public';
```

Deberías ver 6 tablas listadas.

---

## 🆘 Troubleshooting

**Error: "Could not find table 'public.profiles'"**
→ El schema SQL no ha sido ejecutado. Ve a Supabase SQL Editor y copia-pega el schema.sql

**Error: "Foreign key constraint failed"**
→ Las referencias de Foreign Keys fallan si los datos no están en el orden correcto. El script de setup lo maneja automáticamente.

**Error: "Type 'UUID' does not exist"**
→ Raro, pero si pasa, es problema de extensiones de Supabase. Contacta al soporte.

---

## 📊 Datos de Prueba

El script de setup-db crea:
- 4 usuarios (agentes y compradores)
- 5 propiedades (casas, departamentos, comercios)
- 3 operaciones/transacciones
- 3 comisiones

Todos con datos reales y relacionados entre sí.
