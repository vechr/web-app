import { Permission } from '@/domain';

export type Role = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TRoleDetail = Role & {
  permissions: {
    permission: Partial<Permission>;
  }[];
};
