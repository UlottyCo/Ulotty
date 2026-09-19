export type UserRole = 'admin' | 'moderador' | 'agente' | 'comprador' | 'particular' | 'desarrolladora';

export type Permission = 
  | 'create:properties' | 'read:properties' | 'update:properties' | 'delete:properties'
  | 'create:users' | 'read:users' | 'update:users' | 'delete:users'
  | 'create:operations' | 'read:operations' | 'update:operations' | 'delete:operations'
  | 'manage:commissions' | 'manage:analytics' | 'manage:settings' | 'manage:team'
  | 'view:reports' | 'export:data' | 'moderate:content' | 'manage:payments';

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'create:properties', 'read:properties', 'update:properties', 'delete:properties',
    'create:users', 'read:users', 'update:users', 'delete:users',
    'create:operations', 'read:operations', 'update:operations', 'delete:operations',
    'manage:commissions', 'manage:analytics', 'manage:settings', 'manage:team',
    'view:reports', 'export:data', 'moderate:content', 'manage:payments',
  ],
  moderador: [
    'read:properties', 'update:properties', 'read:users', 'update:users',
    'read:operations', 'view:reports', 'moderate:content', 'export:data',
  ],
  agente: [
    'create:properties', 'read:properties', 'update:properties',
    'read:users', 'create:operations', 'read:operations', 'update:operations',
    'view:reports', 'export:data',
  ],
  comprador: [
    'read:properties', 'read:operations', 'view:reports',
  ],
  particular: [
    'create:properties', 'read:properties', 'update:properties',
    'read:operations', 'view:reports',
  ],
  desarrolladora: [
    'create:properties', 'read:properties', 'update:properties', 'delete:properties',
    'read:users', 'create:operations', 'read:operations', 'update:operations',
    'view:reports', 'export:data',
  ],
};

export class RBAC {
  private role: UserRole;

  constructor(role: UserRole) {
    this.role = role;
  }

  hasPermission(permission: Permission): boolean {
    return rolePermissions[this.role]?.includes(permission) ?? false;
  }

  hasAnyPermission(...permissions: Permission[]): boolean {
    return permissions.some((p) => this.hasPermission(p));
  }

  hasAllPermissions(...permissions: Permission[]): boolean {
    return permissions.every((p) => this.hasPermission(p));
  }

  canView(resource: string): boolean {
    const permission = `read:${resource}` as Permission;
    return this.hasPermission(permission);
  }

  canCreate(resource: string): boolean {
    const permission = `create:${resource}` as Permission;
    return this.hasPermission(permission);
  }

  canUpdate(resource: string): boolean {
    const permission = `update:${resource}` as Permission;
    return this.hasPermission(permission);
  }

  canDelete(resource: string): boolean {
    const permission = `delete:${resource}` as Permission;
    return this.hasPermission(permission);
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isModerator(): boolean {
    return this.role === 'moderador';
  }

  isAgent(): boolean {
    return this.role === 'agente';
  }
}

export function createRBAC(role: UserRole): RBAC {
  return new RBAC(role);
}
