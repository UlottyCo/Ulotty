'use client';

import { useRBAC } from '@/lib/use-rbac';
import { type UserRole, type Permission } from '@/lib/rbac';

interface ProtectedActionProps {
  permission: Permission | Permission[];
  requiredAll?: boolean;
  userRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedAction({
  permission,
  requiredAll = false,
  userRole,
  children,
  fallback = null,
}: ProtectedActionProps) {
  const rbac = useRBAC(userRole);
  const permissions = Array.isArray(permission) ? permission : [permission];

  const hasAccess = requiredAll
    ? rbac.hasAllPermissions(...permissions)
    : rbac.hasAnyPermission(...permissions);

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}
