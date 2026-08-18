import { NuevaZonaForm } from "./nueva-zona-form";

export default function NuevaZonaPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Crear nueva zona</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Registra la zona o fraccionamiento donde tienes tus predios, y
        cuántos vas a publicar en total.
      </p>
      <NuevaZonaForm />
    </div>
  );
}
