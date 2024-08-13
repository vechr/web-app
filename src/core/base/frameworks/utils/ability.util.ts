import { defineAbility } from '@casl/ability';
import { TCompactAuthUser } from '@/core/base/domain/entities';

export default defineAbility((can) => {
  can('manage', 'all');
});

export type TPermissionAbilities = {
  action: string;
  subject: string;
}[];

export function permissionAbility(
  currentSession: TCompactAuthUser,
): TPermissionAbilities {
  return currentSession.permissions.map((permission) => ({
    action:
      permission === 'root' ? 'manage' : permission.split(':')[1].split('@')[0],
    subject: permission === 'root' ? 'all' : permission.split(':')[0],
  }));
}
