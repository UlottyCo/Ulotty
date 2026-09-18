"use client";

export function CampanasClient() {
  const campaigns = [
    { name: "Black Friday 2026", status: "Activa", impresiones: 15234, clicks: 1523, ctr: "10%", budget: "$5,000" },
    { name: "Verano Properties", status: "Activa", impresiones: 8945, clicks: 672, ctr: "7.5%", budget: "$3,000" },
    { name: "Primavera Launch", status: "Pausada", impresiones: 4123, clicks: 205, ctr: "5%", budget: "$2,000" },
    { name: "Navidad Special", status: "Completada", impresiones: 25000, clicks: 2500, ctr: "10%", budget: "$8,000" },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold">Nombre</th>
            <th className="text-left py-3 px-4 font-semibold">Estado</th>
            <th className="text-left py-3 px-4 font-semibold">Impresiones</th>
            <th className="text-left py-3 px-4 font-semibold">Clicks</th>
            <th className="text-left py-3 px-4 font-semibold">CTR</th>
            <th className="text-left py-3 px-4 font-semibold">Presupuesto</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.name} className="border-b border-border hover:bg-background transition">
              <td className="py-3 px-4 font-semibold">{c.name}</td>
              <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${c.status === 'Activa' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{c.status}</span></td>
              <td className="py-3 px-4">{c.impresiones.toLocaleString()}</td>
              <td className="py-3 px-4">{c.clicks.toLocaleString()}</td>
              <td className="py-3 px-4">{c.ctr}</td>
              <td className="py-3 px-4 font-semibold">{c.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
