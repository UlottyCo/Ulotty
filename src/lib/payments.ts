export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer' | 'digital_wallet';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: 'MXN' | 'USD';
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  paymentMethodId?: string;
  operationId: string;
  timestamp: Date;
  description?: string;
  metadata?: Record<string, any>;
}

export interface Transaction {
  id: string;
  paymentIntentId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  refundedAmount?: number;
  timestamp: Date;
  completedAt?: Date;
}

export interface Commission {
  id: string;
  agentId: string;
  operationId: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'paid';
  paymentIntentId?: string;
  paidAt?: Date;
}

export class PaymentsService {
  private stripePublishableKey: string;
  private payments: Map<string, PaymentIntent> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private commissions: Map<string, Commission> = new Map();

  constructor(publishableKey: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '') {
    this.stripePublishableKey = publishableKey;
  }

  createPaymentIntent(
    amount: number,
    currency: 'MXN' | 'USD' = 'MXN',
    operationId: string,
    description?: string
  ): PaymentIntent {
    const id = `pi_${Date.now()}`;
    const intent: PaymentIntent = {
      id,
      amount,
      currency,
      status: 'pending',
      operationId,
      timestamp: new Date(),
      description,
    };

    this.payments.set(id, intent);
    return intent;
  }

  confirmPayment(
    paymentIntentId: string,
    paymentMethodId: string,
    userId: string
  ): Transaction | null {
    const payment = this.payments.get(paymentIntentId);
    if (!payment) return null;

    payment.status = 'processing';
    payment.paymentMethodId = paymentMethodId;

    // Simular procesamiento
    setTimeout(() => {
      const intent = this.payments.get(paymentIntentId);
      if (intent) {
        intent.status = 'succeeded';
      }
    }, 2000);

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      paymentIntentId,
      userId,
      amount: payment.amount,
      currency: payment.currency,
      status: 'pending',
      timestamp: new Date(),
    };

    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getPaymentStatus(paymentIntentId: string): string | null {
    const payment = this.payments.get(paymentIntentId);
    return payment?.status || null;
  }

  processCommission(
    agentId: string,
    operationId: string,
    operationAmount: number,
    commissionPercentage: number = 3.0
  ): Commission {
    const id = `comm_${Date.now()}`;
    const amount = (operationAmount * commissionPercentage) / 100;

    const commission: Commission = {
      id,
      agentId,
      operationId,
      amount,
      percentage: commissionPercentage,
      status: 'pending',
    };

    this.commissions.set(id, commission);
    return commission;
  }

  payCommission(commissionId: string, paymentIntentId: string): Commission | null {
    const commission = this.commissions.get(commissionId);
    if (!commission) return null;

    commission.status = 'paid';
    commission.paymentIntentId = paymentIntentId;
    commission.paidAt = new Date();

    return commission;
  }

  refundPayment(transactionId: string, amount?: number): Transaction | null {
    const transaction = this.transactions.get(transactionId);
    if (!transaction) return null;

    const refundAmount = amount || transaction.amount;
    transaction.status = 'refunded';
    transaction.refundedAmount = refundAmount;

    return transaction;
  }

  getTransaction(transactionId: string): Transaction | null {
    return this.transactions.get(transactionId) || null;
  }

  listTransactions(userId: string): Transaction[] {
    return Array.from(this.transactions.values()).filter((t) => t.userId === userId);
  }

  listCommissions(agentId?: string): Commission[] {
    const commissions = Array.from(this.commissions.values());
    if (agentId) {
      return commissions.filter((c) => c.agentId === agentId);
    }
    return commissions;
  }

  calculateTotalCommissions(agentId: string): number {
    return this.listCommissions(agentId).reduce((sum, c) => sum + c.amount, 0);
  }

  calculatePlatformRevenue(): number {
    return Array.from(this.payments.values())
      .filter((p) => p.status === 'succeeded')
      .reduce((sum, p) => sum + p.amount, 0);
  }
}

export const paymentsService = new PaymentsService();
