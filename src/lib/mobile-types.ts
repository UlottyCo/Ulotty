/**
 * Tipos compartidos entre Web y Mobile
 * Importar en ulotty-mobile/lib/types.ts
 */

// User Types
export interface MobileUser {
  id: string;
  email: string;
  full_name: string;
  role: 'particular' | 'agente' | 'comprador' | 'admin';
  avatar?: string;
  phone?: string;
  verified: boolean;
  rating?: number;
}

// Property Types
export interface MobileProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  status: 'activa' | 'vendida' | 'rentada';
  owner: MobileUser;
  createdAt: string;
}

// Chat Types
export interface MobileConversation {
  id: string;
  participants: MobileUser[];
  lastMessage?: MobileMessage;
  unreadCount: number;
  updatedAt: string;
}

export interface MobileMessage {
  id: string;
  conversationId: string;
  sender: MobileUser;
  content: string;
  timestamp: string;
  read: boolean;
}

// Notification Types
export interface MobileNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'property' | 'chat' | 'payment' | 'system';
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

// Auth Types
export interface AuthResponse {
  user: MobileUser;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

// Location Types
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

// Search Types
export interface SearchFilters {
  query?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  beds?: number;
  baths?: number;
  city?: string;
  radius?: number; // km from center
  sortBy?: 'price' | 'newest' | 'distance';
  sortOrder?: 'asc' | 'desc';
}

// Favorite Types
export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
}

// Review Types
export interface Review {
  id: string;
  propertyId?: string;
  agentId?: string;
  author: MobileUser;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
