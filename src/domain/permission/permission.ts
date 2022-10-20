type PermissionType =
  | 'Security'
  | 'ProcessModelling'
  | 'PhyscalModelling'
  | 'Shopfloor';

export type Permission = {
  id: string;
  alias: string;
  name: string;
  description: string | null;
  permissionType: PermissionType | null;
  createdAt: Date;
  updatedAt: Date;
};
