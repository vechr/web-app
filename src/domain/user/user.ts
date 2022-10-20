import { Permission, Site } from '..';
import { Role } from '../role';

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
