"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createClient } from "@/lib/supabase/client";
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_PHOTOS_PER_LISTING,
  MAX_PHOTO_BYTES,
} from "@/lib/photos";
import {
  addListingPhoto,
  deleteListingPhoto,
  reorderListingPhotos,
} from "@/app/actions/listing-photos";

export interface ManagedPhoto {
  id: string;
  url: string;
}

/**
 * crypto.randomUUID() solo existe en contexto seguro (https o localhost),
 * así que no está disponible al probar desde el celular por la IP de la
 * LAN. El nombre solo necesita ser único dentro de la carpeta del predio.
 */
function uniqueFileName() {
  return (
    crypto.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  );
}

function SortablePhoto({
  photo,
  index,
  onDelete,
  busy,
}: {
  photo: ManagedPhoto;
  index: number;
  onDelete: (id: string) => void;
  busy: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  const isCover = index === 0;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
        isCover ? "border-brand" : "border-border"
      } ${isDragging ? "z-10 opacity-80 shadow-lg" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={isCover ? "Foto de portada" : `Foto ${index + 1}`}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {isCover && (
        <span className="absolute left-1 top-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-brand-foreground">
          Portada
        </span>
      )}

      <button
        type="button"
        onClick={() => onDelete(photo.id)}
        disabled={busy}
        aria-label={`Borrar foto ${index + 1}`}
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white disabled:opacity-40"
      >
        ✕
      </button>

      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Mover foto ${index + 1}`}
        style={{ touchAction: "none" }}
        className="absolute bottom-1 left-1 right-1 cursor-grab rounded bg-black/60 py-1 text-center text-[10px] text-white active:cursor-grabbing"
      >
        ⠿ Arrastrar
      </button>
    </div>
  );
}

export function PhotoManager({
  listingId,
  initialPhotos,
}: {
  listingId: string;
  initialPhotos: ManagedPhoto[];
}) {
  const [photos, setPhotos] = useState<ManagedPhoto[]>(initialPhotos);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = photos.findIndex((p) => p.id === active.id);
    const newIndex = photos.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const previous = photos;
    const reordered = arrayMove(photos, oldIndex, newIndex);
    setPhotos(reordered);

    const { error } = await reorderListingPhotos(
      listingId,
      reordered.map((p) => p.id),
    );

    if (error) {
      setPhotos(previous);
      setErrors([error]);
    }
  }

  async function handleDelete(photoId: string) {
    const previous = photos;
    setBusy(true);
    setPhotos(photos.filter((p) => p.id !== photoId));

    const { error } = await deleteListingPhoto(listingId, photoId);
    if (error) {
      setPhotos(previous);
      setErrors([error]);
    }
    setBusy(false);
  }

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const nuevosErrores: string[] = [];
    const validos: File[] = [];
    let disponibles = MAX_PHOTOS_PER_LISTING - photos.length;

    for (const file of files) {
      if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
        nuevosErrores.push(`"${file.name}": formato no permitido (usa JPG, PNG o WEBP).`);
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        nuevosErrores.push(`"${file.name}": pesa más de 5MB.`);
        continue;
      }
      if (disponibles <= 0) {
        nuevosErrores.push(
          `"${file.name}": no se subió, se alcanzó el máximo de ${MAX_PHOTOS_PER_LISTING} fotos.`,
        );
        continue;
      }
      validos.push(file);
      disponibles--;
    }

    setErrors(nuevosErrores);
    if (validos.length === 0) return;

    setUploadingCount(validos.length);
    const supabase = createClient();

    // Una por una, para que una foto que falle no cancele las demás.
    for (const file of validos) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${listingId}/${uniqueFileName()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-photos")
        .upload(path, file, { contentType: file.type });

      if (uploadError) {
        nuevosErrores.push(`"${file.name}": no se pudo subir (${uploadError.message}).`);
        setErrors([...nuevosErrores]);
        setUploadingCount((n) => n - 1);
        continue;
      }

      const { error: rowError, id } = await addListingPhoto(listingId, path);

      if (rowError || !id) {
        await supabase.storage.from("listing-photos").remove([path]);
        nuevosErrores.push(`"${file.name}": ${rowError ?? "no se pudo registrar."}`);
        setErrors([...nuevosErrores]);
        setUploadingCount((n) => n - 1);
        continue;
      }

      const url = supabase.storage.from("listing-photos").getPublicUrl(path)
        .data.publicUrl;

      setPhotos((current) => [...current, { id, url }]);
      setUploadingCount((n) => n - 1);
    }
  }

  const lleno = photos.length >= MAX_PHOTOS_PER_LISTING;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-sm text-muted">
          {photos.length} de {MAX_PHOTOS_PER_LISTING} fotos
        </p>
        {photos.length > 1 && (
          <p className="text-xs text-muted">
            Arrastra para reordenar. La primera es la portada.
          </p>
        )}
      </div>

      {photos.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={photos.map((p) => p.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {photos.map((photo, index) => (
                <SortablePhoto
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onDelete={handleDelete}
                  busy={busy}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {uploadingCount > 0 && (
        <p className="mt-2 text-sm text-muted">
          Subiendo {uploadingCount} foto{uploadingCount === 1 ? "" : "s"}...
        </p>
      )}

      <div className="mt-3">
        <label
          className="mb-1 block text-sm text-muted"
          htmlFor="photo-upload"
        >
          Agregar fotos
        </label>
        <input
          id="photo-upload"
          type="file"
          accept={ACCEPTED_PHOTO_TYPES.join(",")}
          multiple
          disabled={lleno || uploadingCount > 0}
          onChange={handleFilesSelected}
          className="w-full rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50 dark:bg-transparent"
        />
        <p className="mt-1 text-xs text-muted">
          JPG, PNG o WEBP. Máximo 5MB por foto.
        </p>
      </div>

      {errors.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
          {errors.map((mensaje, i) => (
            <li key={i}>{mensaje}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
