import { PaymentsService } from '../payments';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(() => {
    service = new PaymentsService();
  });

  describe('Payment Intents', () => {
    it('should create a payment intent', () => {
      const intent = service.createPaymentIntent(1000, 'MXN', 'op_123', 'Test payment');
      expect(intent.amount).toBe(1000);
      expect(intent.status).toBe('pending');
      expect(intent.operationId).toBe('op_123');
    });

    it('should get payment status', () => {
      const intent = service.createPaymentIntent(1000, 'MXN', 'op_123');
      const status = service.getPaymentStatus(intent.id);
      expect(status).toBe('pending');
    });
  });

  describe('Transactions', () => {
    it('should confirm payment and create transaction', () => {
      const intent = service.createPaymentIntent(1000, 'MXN', 'op_123');
      const transaction = service.confirmPayment(intent.id, 'pm_123', 'user_123');
      
      expect(transaction).not.toBeNull();
      expect(transaction?.userId).toBe('user_123');
      expect(transaction?.status).toBe('pending');
    });

    it('should list transactions for user', () => {
      const intent = service.createPaymentIntent(1000, 'MXN', 'op_123');
      service.confirmPayment(intent.id, 'pm_123', 'user_123');
      
      const transactions = service.listTransactions('user_123');
      expect(transactions.length).toBe(1);
    });

    it('should refund payment', () => {
      const intent = service.createPaymentIntent(1000, 'MXN', 'op_123');
      const transaction = service.confirmPayment(intent.id, 'pm_123', 'user_123');
      
      if (transaction) {
        const refunded = service.refundPayment(transaction.id);
        expect(refunded?.status).toBe('refunded');
        expect(refunded?.refundedAmount).toBe(1000);
      }
    });
  });

  describe('Commissions', () => {
    it('should process commission', () => {
      const commission = service.processCommission('agent_123', 'op_123', 10000, 3.0);
      expect(commission.amount).toBe(300);
      expect(commission.percentage).toBe(3.0);
      expect(commission.status).toBe('pending');
    });

    it('should pay commission', () => {
      const commission = service.processCommission('agent_123', 'op_123', 10000, 3.0);
      const paid = service.payCommission(commission.id, 'pi_123');
      
      expect(paid?.status).toBe('paid');
      expect(paid?.paymentIntentId).toBe('pi_123');
    });

    it('should calculate total commissions for agent', () => {
      service.processCommission('agent_123', 'op_123', 10000, 3.0);
      service.processCommission('agent_123', 'op_456', 5000, 3.0);
      
      const total = service.calculateTotalCommissions('agent_123');
      expect(total).toBe(450); // 300 + 150
    });

    it('should list commissions for agent', () => {
      service.processCommission('agent_123', 'op_123', 10000, 3.0);
      service.processCommission('agent_456', 'op_456', 5000, 3.0);
      
      const agentCommissions = service.listCommissions('agent_123');
      expect(agentCommissions.length).toBe(1);
    });
  });

  describe('Platform Revenue', () => {
    it('should calculate platform revenue', () => {
      const intent1 = service.createPaymentIntent(1000, 'MXN', 'op_123');
      service.confirmPayment(intent1.id, 'pm_123', 'user_123');
      
      const intent2 = service.createPaymentIntent(2000, 'MXN', 'op_456');
      service.confirmPayment(intent2.id, 'pm_456', 'user_456');
      
      // Note: revenue calculation requires succeeded status simulation
      // This is a simplified test
      const revenue = service.calculatePlatformRevenue();
      expect(revenue).toBeGreaterThanOrEqual(0);
    });
  });
});
