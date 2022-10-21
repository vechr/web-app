import { defineAbility } from '@casl/ability';
import { TUserCustomInformation } from '@/domain';

export default defineAbility((can) => {
  can('manage', 'all');
});

export type TPermission = {
  action: string;
  subject: string;
}[];

export function permissionAbility(
  currentSession: TUserCustomInformation,
): TPermission {
  return currentSession.permissions.map((permission) => ({
    action: permission,
    subject: 'any,',
  }));
}
