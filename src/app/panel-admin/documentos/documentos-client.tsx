"use client";

export function DocumentosClient() {
  const docs = [
    { name: "Manual de usuario", size: "2.4 MB", type: "PDF", downloads: 123 },
    { name: "API Documentation", size: "1.8 MB", type: "PDF", downloads: 456 },
    { name: "Guía de administración", size: "3.2 MB", type: "PDF", downloads: 89 },
    { name: "Politicas de privacidad", size: "0.5 MB", type: "PDF", downloads: 234 },
    { name: "Términos de servicio", size: "0.7 MB", type: "PDF", downloads: 145 },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Documento</th>
            <th className="text-left py-3 px-4 font-semibold">Tamaño</th>
            <th className="text-left py-3 px-4 font-semibold">Tipo</th>
            <th className="text-left py-3 px-4 font-semibold">Descargas</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.name} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4 font-semibold">{doc.name}</td>
              <td className="py-3 px-4">{doc.size}</td>
              <td className="py-3 px-4">{doc.type}</td>
              <td className="py-3 px-4 font-bold">{doc.downloads}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
