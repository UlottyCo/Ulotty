import { AdminHeader } from "@/components/admin/admin-header";

export default async function DocumentosPage() {
  const documentos = [
    { nombre: "Política de privacidad.pdf", tamaño: "2.4 MB", tipo: "PDF", creado: "1 ago 2024", modificado: "17 sep 2026", descargas: 145 },
    { nombre: "Términos de servicio.docx", tamaño: "1.8 MB", tipo: "Word", creado: "1 ago 2024", modificado: "15 sep 2026", descargas: 128 },
    { nombre: "Guía de usuario.pdf", tamaño: "5.2 MB", tipo: "PDF", creado: "1 ago 2024", modificado: "10 sep 2026", descargas: 287 },
    { nombre: "FAQ.html", tamaño: "342 KB", tipo: "HTML", creado: "15 ago 2024", modificado: "12 sep 2026", descargas: 534 },
    { nombre: "Manual de API.pdf", tamaño: "3.1 MB", tipo: "PDF", creado: "20 ago 2024", modificado: "5 sep 2026", descargas: 78 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Documentos</h1>
            <p className="text-muted mt-2">Gestiona documentos y archivos del sistema.</p>
          </div>
          <button className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition">
            + Subir documento
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Total documentos</div>
            <div className="text-2xl font-bold text-brand">47</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Espacio usado</div>
            <div className="text-2xl font-bold text-blue-600">234 MB</div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="text-sm text-muted mb-2">Descargas totales</div>
            <div className="text-2xl font-bold text-green-600">1.2K</div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-right py-3 px-4 font-semibold">Tamaño</th>
                <th className="text-left py-3 px-4 font-semibold">Creado</th>
                <th className="text-left py-3 px-4 font-semibold">Modificado</th>
                <th className="text-center py-3 px-4 font-semibold">Descargas</th>
                <th className="text-center py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-semibold">{doc.nombre}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {doc.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{doc.tamaño}</td>
                  <td className="py-3 px-4 text-xs text-muted">{doc.creado}</td>
                  <td className="py-3 px-4 text-xs text-muted">{doc.modificado}</td>
                  <td className="py-3 px-4 text-center font-bold">{doc.descargas}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-xs text-brand hover:underline font-semibold">Descargar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
