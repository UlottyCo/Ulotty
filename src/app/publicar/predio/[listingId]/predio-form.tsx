"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import {
  updateListingDraft,
  type UpdateListingDraftState,
} from "@/app/actions/listings";
import type { Listing, ListingOperation, ListingType } from "@/types";
import { FormSection } from "./form-section";
import { PhotoManager, type ManagedPhoto } from "./photo-manager";

const LocationPicker = dynamic(
  () =>
    import("@/components/map/location-picker").then(
      (m) => m.LocationPicker,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-border text-sm text-muted">
        Cargando mapa...
      </div>
    ),
  },
);

const BoundaryPicker = dynamic(
  () =>
    import("@/components/map/boundary-picker").then((m) => m.BoundaryPicker),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-border text-sm text-muted">
        Cargando mapa...
      </div>
    ),
  },
);

const TYPE_OPTIONS: { value: ListingType; label: string }[] = [
  { value: "predio", label: "Predio" },
  { value: "casa", label: "Casa" },
  { value: "depto", label: "Depto" },
];

const OPERATION_OPTIONS: { value: ListingOperation; label: string }[] = [
  { value: "venta", label: "Venta" },
  { value: "renta", label: "Renta" },
];

const AMENITIES_OPTIONS = [
  "alberca",
  "vista_mar",
  "acceso_playa",
  "estacionamiento",
  "seguridad_24h",
  "amueblado",
  "aire_acondicionado",
  "jardin",
  "terraza",
  "acepta_mascotas",
];

const AMENITIES_LABELS: Record<string, string> = {
  alberca: "Alberca",
  vista_mar: "Vista al mar",
  acceso_playa: "Acceso a playa",
  estacionamiento: "Estacionamiento",
  seguridad_24h: "Seguridad 24h",
  amueblado: "Amueblado",
  aire_acondicionado: "Aire acondicionado",
  jardin: "Jardín",
  terraza: "Terraza",
  acepta_mascotas: "Acepta mascotas",
};

const initialState: UpdateListingDraftState = { error: null };

export function PredioForm({
  listing,
  photos,
  suggestedExchangeRate,
}: {
  listing: Listing;
  photos: ManagedPhoto[];
  suggestedExchangeRate: number | null;
}) {
  const action = updateListingDraft.bind(null, listing.id);
  const [state, formAction, pending] = useActionState(action, initialState);

  const [type, setType] = useState<ListingType | null>(listing.type);
  const [operation, setOperation] = useState<ListingOperation | null>(
    listing.operation,
  );
  const [latitude, setLatitude] = useState<number | null>(listing.latitude);
  const [longitude, setLongitude] = useState<number | null>(
    listing.longitude,
  );
  const [boundaryPoints, setBoundaryPoints] = useState<[number, number][]>(
    listing.boundaryPoints ?? [],
  );
  const [bathrooms, setBathrooms] = useState<number | null>(listing.bathrooms ?? null);
  const [parkingSpots, setParkingSpots] = useState<number | null>(
    listing.parking_spots ?? null,
  );
  const [amenities, setAmenities] = useState<string[]>(listing.amenities ?? []);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-6">
      <input type="hidden" name="type" value={type ?? ""} />
      <input type="hidden" name="operation" value={operation ?? ""} />
      <input type="hidden" name="latitude" value={latitude ?? ""} />
      <input type="hidden" name="longitude" value={longitude ?? ""} />
      <input
        type="hidden"
        name="boundaryPoints"
        value={JSON.stringify(boundaryPoints)}
      />
      <input type="hidden" name="bathrooms" value={bathrooms ?? ""} />
      <input type="hidden" name="parkingSpots" value={parkingSpots ?? ""} />
      <input type="hidden" name="amenities" value={JSON.stringify(amenities)} />

      <FormSection title="Información básica">
        <div>
          <label
            className="mb-1 block text-sm text-muted"
            htmlFor="folio"
          >
            Folio
          </label>
          <input
            id="folio"
            name="folio"
            type="text"
            required
            defaultValue={listing.folio ?? ""}
            placeholder="Ej. LP-04"
            className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Tipo</p>
          <div className="grid grid-cols-3 gap-2">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  type === option.value
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Operación</p>
          <div className="grid grid-cols-2 gap-2">
            {OPERATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setOperation(option.value)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  operation === option.value
                    ? "border-foreground"
                    : "border-border"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label
            className="mb-1 block text-sm text-muted"
            htmlFor="bedrooms"
          >
            Recámaras (habitaciones)
          </label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min={0}
            defaultValue={listing.bedrooms ?? ""}
            placeholder="Ej. 3"
            className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="priceMxn"
            >
              Precio (MXN)
            </label>
            <input
              id="priceMxn"
              name="priceMxn"
              type="number"
              min={0}
              step="0.01"
              required
              defaultValue={listing.priceMxn ?? ""}
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="areaM2"
            >
              m²
            </label>
            <input
              id="areaM2"
              name="areaM2"
              type="number"
              min={0}
              step="0.01"
              required
              defaultValue={listing.areaM2 ?? ""}
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="priceUsd"
            >
              Precio (USD) — opcional
            </label>
            <input
              id="priceUsd"
              name="priceUsd"
              type="number"
              min={0}
              step="0.01"
              defaultValue={listing.priceUsd ?? ""}
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="exchangeRateUsed"
            >
              Tipo de cambio usado — opcional
            </label>
            <input
              id="exchangeRateUsed"
              name="exchangeRateUsed"
              type="number"
              min={0}
              step="0.0001"
              defaultValue={
                listing.exchangeRateUsed ?? suggestedExchangeRate ?? ""
              }
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
            {listing.exchangeRateUsed === null &&
              suggestedExchangeRate !== null && (
                <p className="mt-1 text-xs text-muted">
                  Sugerido: {suggestedExchangeRate.toFixed(4)} (tipo de cambio
                  de hoy − $0.30). Puedes cambiarlo libremente.
                </p>
              )}
          </div>
        </div>

        <div>
          <label
            className="mb-1 block text-sm text-muted"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={listing.description ?? ""}
            className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
          />
        </div>
      </FormSection>

      <FormSection title="Servicios y amenidades">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="bathrooms"
            >
              Baños
            </label>
            <input
              id="bathrooms"
              type="number"
              min={0}
              step="0.5"
              value={bathrooms ?? ""}
              onChange={(e) => setBathrooms(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="Ej. 2.5"
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm text-muted"
              htmlFor="parkingSpots"
            >
              Estacionamientos
            </label>
            <input
              id="parkingSpots"
              type="number"
              min={0}
              value={parkingSpots ?? ""}
              onChange={(e) => setParkingSpots(e.target.value ? parseInt(e.target.value, 10) : null)}
              placeholder="Ej. 2"
              className="w-full rounded-md border border-border px-3 py-2 dark:bg-transparent"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">Amenidades</p>
          <div className="grid grid-cols-2 gap-3">
            {AMENITIES_OPTIONS.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAmenities([...amenities, amenity]);
                    } else {
                      setAmenities(amenities.filter((a) => a !== amenity));
                    }
                  }}
                  className="h-4 w-4"
                />
                <span className="text-sm">{AMENITIES_LABELS[amenity]}</span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Ubicación"
        description="Haz clic en el mapa para marcar el predio."
      >
        <LocationPicker
          latitude={latitude}
          longitude={longitude}
          onChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />

        {type === "predio" && (
          <div>
            <p className="mb-2 text-sm font-medium">
              Perímetro del predio — opcional, haz clic para marcar cada
              esquina del terreno
            </p>
            <BoundaryPicker
              points={boundaryPoints}
              center={
                latitude !== null && longitude !== null
                  ? [latitude, longitude]
                  : null
              }
              onChange={setBoundaryPoints}
            />
          </div>
        )}
      </FormSection>

      <FormSection title="Multimedia">
        <PhotoManager listingId={listing.id} initialPhotos={photos} />
      </FormSection>

      <FormSection title="Información comercial">
        {listing.isExclusive ? (
          <p className="rounded-md bg-subtle p-3 text-sm">
            Ya aceptaste exclusividad para este predio, vigente hasta{" "}
            {listing.exclusiveUntil
              ? new Date(listing.exclusiveUntil).toLocaleDateString("es-MX")
              : ""}
            .
          </p>
        ) : (
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="acceptExclusivity"
              className="mt-1"
            />
            <span>
              Acepto exclusividad de 90 días para este predio, a cambio de
              posición destacada en el buscador.
            </span>
          </label>
        )}
      </FormSection>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Guardar y continuar"}
      </button>
    </form>
  );
}
