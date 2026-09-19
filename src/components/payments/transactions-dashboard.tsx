'use client';

import { useState, useEffect } from 'react';
import { Transaction, Commission } from '@/lib/payments';

interface TransactionsDashboardProps {
  transactions: Transaction[];
  commissions?: Commission[];
}

export function TransactionsDashboard({
  transactions,
  commissions = [],
}: TransactionsDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => t.status === filter);

  const totalRevenue = transactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);
  const paidCommissions = commissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">💰 Ingresos Totales</div>
          <div className="text-3xl font-bold text-brand">
            ${totalRevenue.toLocaleString('es-MX')}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">📊 Transacciones</div>
          <div className="text-3xl font-bold text-blue-600">{transactions.length}</div>
          <div className="text-xs text-muted mt-2">
            {transactions.filter((t) => t.status === 'completed').length} completadas
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">🎁 Comisiones Pendientes</div>
          <div className="text-3xl font-bold text-orange-600">
            ${(totalCommissions - paidCommissions).toLocaleString('es-MX')}
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="text-sm text-muted mb-2">✅ Comisiones Pagadas</div>
          <div className="text-3xl font-bold text-green-600">
            ${paidCommissions.toLocaleString('es-MX')}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">📋 Transacciones</h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
            <option value="failed">Fallidas</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-muted">Monto</th>
                <th className="text-left py-3 px-4 font-semibold text-muted">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-muted">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border hover:bg-background transition">
                  <td className="py-3 px-4 font-mono text-xs">{txn.id.slice(0, 12)}...</td>
                  <td className="py-3 px-4 font-semibold">
                    ${txn.amount.toLocaleString('es-MX')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : txn.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : txn.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted">
                    {new Date(txn.timestamp).toLocaleDateString('es-MX')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commissions Table */}
      {commissions.length > 0 && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="font-bold text-lg mb-6">🎁 Comisiones</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted">Monto</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted">Porcentaje</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted">Estado</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((comm) => (
                  <tr key={comm.id} className="border-b border-border hover:bg-background transition">
                    <td className="py-3 px-4 font-mono text-xs">{comm.id.slice(0, 12)}...</td>
                    <td className="py-3 px-4 font-semibold">
                      ${comm.amount.toLocaleString('es-MX')}
                    </td>
                    <td className="py-3 px-4">{comm.percentage}%</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          comm.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {comm.status === 'paid' ? '✅ Pagada' : '⏳ Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
