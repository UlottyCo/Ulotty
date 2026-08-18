export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold">Encuentra tu próxima propiedad en Rosarito</h1>
      <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
        Busca casas, departamentos y terrenos en venta o renta. Aquí irá el
        buscador principal del marketplace.
      </p>

      <form className="mt-8 flex flex-col gap-3 rounded-lg border border-black/10 p-4 sm:flex-row dark:border-white/10">
        <input
          type="text"
          placeholder="Ciudad, colonia o palabra clave"
          className="flex-1 rounded-md border border-black/10 px-3 py-2 dark:border-white/10 dark:bg-transparent"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-6 py-2 text-white dark:bg-white dark:text-black"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
