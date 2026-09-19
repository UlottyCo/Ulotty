'use client';

import { useState } from 'react';
import { PaymentIntent } from '@/lib/payments';

interface CheckoutFormProps {
  paymentIntent: PaymentIntent;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export function CheckoutForm({ paymentIntent, onSuccess, onError }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // En producción, aquí iría la integración real con Stripe
      // const result = await stripe.confirmPayment({...})

      // Por ahora, simulamos
      if (!cardNumber || !expiry || !cvc || !name) {
        throw new Error('Por favor completa todos los campos');
      }

      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        throw new Error('Número de tarjeta inválido');
      }

      // Simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onSuccess(`txn_${Date.now()}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error en el pago';
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 max-w-md mx-auto">
      <h3 className="font-bold text-lg mb-4">💳 Información de Pago</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Display */}
        <div className="bg-background p-4 rounded-lg text-center">
          <div className="text-sm text-muted mb-1">Monto a pagar</div>
          <div className="text-3xl font-bold text-brand">
            ${paymentIntent.amount.toLocaleString('es-MX')}
          </div>
          <div className="text-xs text-muted mt-1">{paymentIntent.currency}</div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nombre del titular</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold mb-2">Número de tarjeta</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Vencimiento</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="123"
              maxLength={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-brand text-brand-foreground font-semibold rounded-lg hover:bg-brand/90 disabled:opacity-50 transition"
        >
          {loading ? '⏳ Procesando...' : `💳 Pagar $${paymentIntent.amount.toLocaleString('es-MX')}`}
        </button>

        {/* Security Info */}
        <p className="text-xs text-muted text-center">
          🔒 Tu información de pago es segura y encriptada
        </p>
      </form>
    </div>
  );
}
