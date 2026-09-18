export type AmenityType = 
  | 'alberca'
  | 'vista_mar'
  | 'acceso_playa'
  | 'estacionamiento'
  | 'seguridad_24h'
  | 'amueblado'
  | 'aire_acondicionado'
  | 'jardin'
  | 'terraza'
  | 'acepta_mascotas';

export const AMENITIES_OPTIONS: { value: AmenityType; label: string }[] = [
  { value: 'alberca', label: 'Alberca' },
  { value: 'vista_mar', label: 'Vista al mar' },
  { value: 'acceso_playa', label: 'Acceso a playa' },
  { value: 'estacionamiento', label: 'Estacionamiento' },
  { value: 'seguridad_24h', label: 'Seguridad 24h' },
  { value: 'amueblado', label: 'Amueblado' },
  { value: 'aire_acondicionado', label: 'Aire acondicionado' },
  { value: 'jardin', label: 'Jardín' },
  { value: 'terraza', label: 'Terraza' },
  { value: 'acepta_mascotas', label: 'Acepta mascotas' },
];

export type UserRole = "particular" | "desarrolladora" | "agente" | "comprador" | "admin";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  phoneVerified: boolean;
  phoneVerifiedAt: string | null;
}

export interface ListingGroup {
  id: string;
  ownerId: string;
  title: string;
  zone: string;
  declaredLotsTotal: number;
  createdAt: string;
}

export type ListingType = "predio" | "casa" | "depto";
export type ListingOperation = "venta" | "renta";
export type ListingStatus =
  | "borrador"
  | "disponible"
  | "apartado"
  | "vendido"
  | "vendido_fuera"
  | "pausado_por_falta_de_credito";

export interface Listing {
  id: string;
  listingGroupId: string;
  folio: string | null;
  type: ListingType | null;
  operation: ListingOperation | null;
  priceMxn: number | null;
  priceUsd: number | null;
  exchangeRateUsed: number | null;
  areaM2: number | null;
  bedrooms: number | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  status: ListingStatus;
  statusChangedAt: string;
  requiresVerification: boolean;
  createdAt: string;
  commissionRatePct: number | null;
  commissionAmountMxn: number | null;
  requiresUlot: boolean;
  nextRenewalAt: string | null;
  delistedAt: string | null;
  isExclusive: boolean;
  exclusiveUntil: string | null;
  boundaryPoints: [number, number][] | null;
  bathrooms: number | null;
  parking_spots: number | null;
  amenities: AmenityType[] | null;
}

export interface ListingPhoto {
  id: string;
  listingId: string;
  storagePath: string;
  position: number;
  createdAt: string;
}

export interface Lead {
  id: string;
  listingId: string;
  buyerId: string;
  contactedAt: string;
}

export type VerificationStatus = "pendiente" | "aprobado" | "rechazado";

export interface Verification {
  id: string;
  listingId: string;
  documentPath: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  rejectionReason: string | null;
}

export interface ListingStatusHistoryEntry {
  id: string;
  listingId: string;
  status: ListingStatus;
  changedAt: string;
  changedBy: string | null;
  reason: string | null;
  priceMxnSnapshot: number | null;
  penaltyAmountMxn: number | null;
  penaltyStatus: "pendiente" | "cobrado" | null;
}

export interface DailyExchangeRate {
  id: string;
  rate: number;
  setBy: string;
  setAt: string;
}

export interface UlotTransaction {
  id: string;
  userId: string;
  delta: number;
  reason: string;
  relatedListingId: string | null;
  createdBy: string | null;
  createdAt: string;
}

export interface BuyerIdVerification {
  id: string;
  buyerId: string;
  documentPath: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  rejectionReason: string | null;
}

export interface VisitRequest {
  id: string;
  leadId: string;
  preferredDatetime: string;
  message: string | null;
  createdAt: string;
}
