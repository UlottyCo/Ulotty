/**
 * Límites de fotos de listings. Viven aquí y no en el archivo de
 * Server Actions porque un módulo "use server" solo puede exportar
 * funciones async.
 *
 * MAX_PHOTO_BYTES y ACCEPTED_PHOTO_TYPES deben coincidir con la
 * configuración del bucket listing-photos (file_size_limit y
 * allowed_mime_types); el bucket es la autoridad final.
 */
export const MAX_PHOTOS_PER_LISTING = 45;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
