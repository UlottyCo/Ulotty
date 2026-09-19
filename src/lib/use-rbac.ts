'use client';

import { useCallback } from 'react';
import { createRBAC, type UserRole, type Permission } from './rbac';

export function useRBAC(role: UserRole) {
  const rbac = createRBAC(role);

  const hasPermission = useCallback((permission: Permission) => {
    return rbac.hasPermission(permission);
  }, [rbac]);

  const hasAnyPermission = useCallback((...permissions: Permission[]) => {
    return rbac.hasAnyPermission(...permissions);
  }, [rbac]);

  const hasAllPermissions = useCallback((...permissions: Permission[]) => {
    return rbac.hasAllPermissions(...permissions);
  }, [rbac]);

  return {
    role,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: rbac.isAdmin(),
    isModerator: rbac.isModerator(),
    isAgent: rbac.isAgent(),
    canView: (resource: string) => rbac.canView(resource),
    canCreate: (resource: string) => rbac.canCreate(resource),
    canUpdate: (resource: string) => rbac.canUpdate(resource),
    canDelete: (resource: string) => rbac.canDelete(resource),
  };
}
