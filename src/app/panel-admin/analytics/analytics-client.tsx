'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  totalProperties: number;
  totalUsers: number;
  totalRevenue: number;
  activeListings: number;
  monthlyGrowth: Array<{ month: string; users: number; properties: number }>;
  revenueByType: Array<{ type: string; value: number }>;
  recentOperations: Array<{
    id: string;
    property: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

const mockData: AnalyticsData = {
  totalProperties: 2450,
  totalUsers: 1820,
  totalRevenue: 4250000,
  activeListings: 1205,
  monthlyGrowth: [
    { month: 'Ene', users: 1200, properties: 800 },
    { month: 'Feb', users: 1350, properties: 950 },
    { month: 'Mar', users: 1520, properties: 1100 },
    { month: 'Abr', users: 1680, properties: 1250 },
    { month: 'May', users: 1800, properties: 1400 },
    { month: 'Jun', users: 1820, properties: 1450 },
  ],
  revenueByType: [
    { type: 'Comisiones', value: 2100000 },
    { type: 'Suscripciones', value: 1250000 },
    { type: 'Publicidad', value: 900000 },
  ],
  recentOperations: [
    { id: '1', property: 'Apartamento Centro', amount: 250000, status: 'Completada', date: '2026-09-18' },
    { id: '2', property: 'Casa Familiar', amount: 450000, status: 'En proceso', date: '2026-09-17' },
    { id: '3', property: 'Local Comercial', amount: 2500, status: 'Completada', date: '2026-09-16' },
    { id: '4', property: 'Piso Céntrico', amount: 320000, status: 'Completada', date: '2026-09-15' },
    { id: '5', property: 'Terreno Urbanizable', amount: 350000, status: 'Pendiente', date: '2026-09-14' },
  ],
};

const colors = ['#463f35', '#8c7a5e', '#a9b79a'];

export function AnalyticsClient() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin">⏳</div>
        <span className="ml-2">Cargando análisis...</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">🏠 Propiedades</div>
          <div className="text-3xl font-bold text-brand">{data.totalProperties}</div>
          <div className="text-xs text-muted mt-2">Total en plataforma</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">👥 Usuarios</div>
          <div className="text-3xl font-bold text-blue-600">{data.totalUsers}</div>
          <div className="text-xs text-muted mt-2">Registrados</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">💰 Ingresos</div>
          <div className="text-3xl font-bold text-green-600">
            ${(data.totalRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-muted mt-2">Total generado</div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">✨ Activos</div>
          <div className="text-3xl font-bold text-purple-600">{data.activeListings}</div>
          <div className="text-xs text-muted mt-2">Listados activos</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="font-bold text-lg mb-4">Crecimiento mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--surface)', 
                  border: '1px solid var(--border)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#463f35" strokeWidth={2} name="Usuarios" />
              <Line type="monotone" dataKey="properties" stroke="#8c7a5e" strokeWidth={2} name="Propiedades" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="font-bold text-lg mb-4">Ingresos por fuente</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.revenueByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, value }) => `${type}: $${(value / 1000000).toFixed(1)}M`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.revenueByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${(value as number / 1000000).toFixed(1)}M`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Operations */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="font-bold text-lg mb-6">Operaciones recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted">Propiedad</th>
                <th className="text-left py-3 px-4 font-semibold text-muted">Monto</th>
                <th className="text-left py-3 px-4 font-semibold text-muted">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-muted">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOperations.map((op) => (
                <tr key={op.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4">{op.property}</td>
                  <td className="py-3 px-4 font-semibold">
                    ${op.amount.toLocaleString('es-MX')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      op.status === 'Completada' ? 'bg-green-100 text-green-700' :
                      op.status === 'En proceso' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {op.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted">{op.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
