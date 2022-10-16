export type TUser = {
  id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string | null;
  description: string | null;
  username: string;
  password: string;
  siteId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Site = {
  id: string;
  code: string;
  name: string;
  location: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type Role = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type UsersRoles = {
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
};

type RolesPermissions = {
  roleId: string;
  permissionId: string;
  createdAt: Date;
  updatedAt: Date;
};

type PermissionType =
  | 'Security'
  | 'ProcessModelling'
  | 'PhyscalModelling'
  | 'Shopfloor';

type Permission = {
  id: string;
  alias: string;
  name: string;
  description: string | null;
  permissionType: PermissionType | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TUserCustomInformation = Partial<TUser> & {
  siteCode: string;
  roles: string[];
  permissions: string[];
};

export type TUserFullInformation = TUser &
  TUsersRoles & {
    site: Site;
  };

export type TUsersRoles = {
  roles: (UsersRoles & {
    role: Role & {
      permissions: (RolesPermissions & { permission: Permission })[];
    };
  })[];
};
