# 📱 Ulotty Mobile App - Roadmap

## Tecnología Recomendada: React Native

### Por qué React Native:
- Código compartido entre iOS y Android
- Reutilización de JavaScript/TypeScript
- Desarrollo más rápido que Flutter
- Comunidad más grande
- Integración con Expo para deployments

## Estructura del Proyecto

```
ulotty-mobile/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/
│   │   ├── home/
│   │   │   ├── index.tsx
│   │   │   └── property/[id].tsx
│   │   ├── search/
│   │   │   ├── index.tsx
│   │   │   └── filters.tsx
│   │   ├── chat/
│   │   │   ├── index.tsx
│   │   │   └── conversation/[id].tsx
│   │   ├── profile/
│   │   │   ├── index.tsx
│   │   │   └── edit.tsx
│   │   └── my-properties/
│   │       ├── index.tsx
│   │       └── create.tsx
│   └── _layout.tsx
├── components/
│   ├── PropertyCard.tsx
│   ├── BottomNav.tsx
│   ├── ChatBubble.tsx
│   ├── FormInput.tsx
│   └── LoadingSpinner.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── storage.ts
│   └── notifications.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useProperties.ts
│   ├── useChat.ts
│   └── useNotifications.ts
└── app.json
```

## Fases de Implementación

### Fase 1: Scaffolding y Auth (Semana 1-2)
- [ ] Setup Expo con TypeScript
- [ ] Configurar React Navigation
- [ ] Implementar Login/Registro
- [ ] Setup de AsyncStorage para tokens
- [ ] Autenticación con Supabase

### Fase 2: Listado de Propiedades (Semana 2-3)
- [ ] Listar propiedades desde API
- [ ] Implementar PropertyCard component
- [ ] Filtros básicos (tipo, precio, ubicación)
- [ ] Búsqueda con Nominatim
- [ ] Mapas con react-native-maps

### Fase 3: Detalles y Gestión (Semana 3-4)
- [ ] Detalle de propiedad
- [ ] Galería de fotos
- [ ] Contactar agente
- [ ] Para agentes: crear/editar propiedades
- [ ] Cámara para fotos

### Fase 4: Chat y Notificaciones (Semana 4-5)
- [ ] Chat en tiempo real con WebSockets
- [ ] Notificaciones push
- [ ] Sonidos y vibraciones
- [ ] Badge contador

### Fase 5: Perfil y Configuración (Semana 5)
- [ ] Mi perfil
- [ ] Editar perfil
- [ ] Mis propiedades (para agentes)
- [ ] Favoritos
- [ ] Dark mode

## Librerías Recomendadas

```json
{
  "dependencies": {
    "expo": "^50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.0.0",
    "@react-navigation/bottom-tabs": "^6.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "axios": "^1.6.0",
    "react-native-maps": "^1.10.0",
    "react-native-socket.io": "^1.1.0",
    "@react-native-camera-roll/camera-roll": "^7.0.0",
    "expo-image-picker": "^14.0.0",
    "expo-notifications": "^0.27.0",
    "zustand": "^4.4.0",
    "async-storage": "^1.21.0"
  }
}
```

## API Endpoints Compartidos

```typescript
// Mobile app usa los mismos endpoints que web:
const API_URL = process.env.REACT_APP_API_URL;

// Auth
POST   /auth/login
POST   /auth/register
POST   /auth/logout
GET    /auth/me

// Properties
GET    /properties
GET    /properties/:id
POST   /properties (agentes)
PUT    /properties/:id (agentes)
DELETE /properties/:id (agentes)

// Chat
GET    /conversations
POST   /conversations
GET    /conversations/:id/messages
POST   /conversations/:id/messages

// Notifications
GET    /notifications
POST   /notifications/subscribe
```

## Push Notifications Setup

```typescript
// 1. Expo Push Notifications
import * as Notifications from 'expo-notifications';

// 2. Get device token
const token = (await Notifications.getExpoPushTokenAsync()).data;

// 3. Send to backend
POST /notifications/register
  { deviceToken: token }

// 4. Receive notifications
Notifications.addNotificationResponseListener((response) => {
  // Handle notification tapped
});
```

## Offline Capabilities

```typescript
// AsyncStorage + Zustand para caché
- Guardar propiedades visitadas
- Guardar chats offline
- Queue de mensajes a enviar cuando online
- Sincronización automática cuando conecta
```

## Testing Strategy

```typescript
// Jest + React Native Testing Library
- Unit tests para hooks
- Integration tests para flows
- E2E tests con Detox
```

## Deployment

### iOS (TestFlight/App Store)
```bash
eas build --platform ios
eas submit --platform ios
```

### Android (Google Play)
```bash
eas build --platform android
eas submit --platform android
```

### OTA Updates (Expo Updates)
```bash
eas update
```

## Timeline Estimado

- **Total:** 6-8 semanas
- **Sprint 1 (Auth + Basics):** 2 semanas
- **Sprint 2 (Properties):** 2 semanas
- **Sprint 3 (Chat + Notifications):** 2 semanas
- **Sprint 4 (Polish + Deploy):** 1-2 semanas

## Success Metrics

- [ ] 1000+ downloads
- [ ] 4.5+ rating
- [ ] < 2 seg load time
- [ ] 99% uptime
- [ ] < 100MB app size
- [ ] < 50MB data usage/month

## Bonus Features (Post-launch)

- [ ] AR property visualization
- [ ] Video tours
- [ ] AR furniture preview
- [ ] Voice messages in chat
- [ ] Social sharing
- [ ] Wishlist/favorites
- [ ] Reviews and ratings
- [ ] Booking/scheduling
