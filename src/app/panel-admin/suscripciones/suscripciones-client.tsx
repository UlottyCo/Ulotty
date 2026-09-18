"use client";

export function SuscripcionesClient() {
  const plans = [
    { name: "Free", price: "$0", users: 1234, features: ["5 propiedades", "Soporte básico"] },
    { name: "Premium", price: "$99/mes", users: 567, features: ["50 propiedades", "Soporte priority", "Analytics avanzado"] },
    { name: "Professional", price: "$299/mes", users: 89, features: ["Unlimited", "Soporte 24/7", "API access"] },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.name} className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <div className="text-3xl font-bold text-brand mb-4">{plan.price}</div>
          <div className="text-sm text-muted mb-4">{plan.users.toLocaleString()} usuarios</div>
          <ul className="space-y-2 mb-6">
            {plan.features.map((f) => (
              <li key={f} className="text-sm">✓ {f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
