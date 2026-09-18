"use client";

export function ApiClient() {
  const keys = [
    { name: "Production Key", status: "Activa", requests: 125000, createdDate: "2026-06-01" },
    { name: "Development Key", status: "Activa", requests: 45000, createdDate: "2026-08-15" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Total API Keys</div>
          <div className="text-2xl font-bold text-brand">{keys.length}</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">Requests este mes</div>
          <div className="text-2xl font-bold text-blue-600">170K</div>
        </div>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">Nombre</th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4 font-semibold">Requests</th>
              <th className="text-left py-3 px-4 font-semibold">Creada</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.name} className="border-b border-border hover:bg-background transition">
                <td className="py-3 px-4 font-semibold">{key.name}</td>
                <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{key.status}</span></td>
                <td className="py-3 px-4">{key.requests.toLocaleString()}</td>
                <td className="py-3 px-4">{key.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
