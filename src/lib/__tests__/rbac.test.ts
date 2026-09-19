import { createRBAC } from '../rbac';

describe('RBAC', () => {
  describe('Admin role', () => {
    const admin = createRBAC('admin');

    it('should have all permissions', () => {
      expect(admin.hasPermission('create:properties')).toBe(true);
      expect(admin.hasPermission('delete:users')).toBe(true);
      expect(admin.hasPermission('manage:settings')).toBe(true);
    });

    it('should be admin', () => {
      expect(admin.isAdmin()).toBe(true);
    });
  });

  describe('Agent role', () => {
    const agent = createRBAC('agente');

    it('should create properties', () => {
      expect(agent.canCreate('properties')).toBe(true);
    });

    it('should not delete users', () => {
      expect(agent.canDelete('users')).toBe(false);
    });

    it('should not manage settings', () => {
      expect(agent.hasPermission('manage:settings')).toBe(false);
    });
  });

  describe('Buyer role', () => {
    const buyer = createRBAC('comprador');

    it('should read properties', () => {
      expect(buyer.canView('properties')).toBe(true);
    });

    it('should not create properties', () => {
      expect(buyer.canCreate('properties')).toBe(false);
    });

    it('should read operations', () => {
      expect(buyer.canView('operations')).toBe(true);
    });
  });

  describe('Moderator role', () => {
    const mod = createRBAC('moderador');

    it('should moderate content', () => {
      expect(mod.hasPermission('moderate:content')).toBe(true);
    });

    it('should not delete properties', () => {
      expect(mod.canDelete('properties')).toBe(false);
    });

    it('should update properties', () => {
      expect(mod.canUpdate('properties')).toBe(true);
    });
  });
});
