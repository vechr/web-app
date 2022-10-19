import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { ICreateRole, IRoleData, IUpdateRole, TRoleDetail } from '@/domain';
import { roleController } from '@/applications/controllers';
import { useCommonStore } from '@/ui/store';

export const useRoleManagementStore = defineStore('roleManagement', {
  state: () => {
    return {
      message: '',
      data: [],
      updateRole: { permissions: [] },
      dataDetails: undefined,
      optionRoles: [],
      success: true,
      error: {
        code: '',
        message: '',
        params: {},
      },
      meta: {},
    } as IRoleData;
  },
  getters: {
    roleColumnsSort() {
      return [
        {
          label: 'Role Name',
          value: 'name',
        },
        {
          label: 'Description',
          value: 'description',
        },
        {
          label: 'Created At',
          value: 'createdAt',
        },
        {
          label: 'Updated At',
          value: 'updatedAt',
        },
      ];
    },
    roleColumns() {
      return [
        {
          title: 'Role Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'action',
        },
      ];
    },
  },
  actions: {
    transformToTableData(data: TRoleDetail) {
      return {
        id: data.id,
        name: data.name,
        description: data.description,
      };
    },
    async getRolePagination(params: Record<string, any>) {
      const common = useCommonStore();
      common.setIsLoading(true);

      const result = await roleController().getRoles(params);

      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.success = result.data?.success;
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
          this.meta = result.data?.meta;
        }
      }
      common.setIsLoading(false);
    },
    async getOptionRole() {
      const result = await roleController().getRoleAll();
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.optionRoles = this.data.map((role) => ({
            value: role.id ? role.id : '',
            label: role.name ? role.name : '',
          }));
          this.error = result.data?.error;
        }
      }
    },
    async getRoleById(roleId: string): Promise<TRoleDetail | undefined> {
      const common = useCommonStore();
      const result = await roleController().getRoleById(roleId);
      if (result.data) {
        this.error = result.data.error;
        this.updateRole.name = result.data.result.name;
        this.updateRole.description = result.data.result.description;
        this.updateRole.permissions = result.data.result.permissions.map(
          (rolesPermissions: { permission: { id: string } }) =>
            rolesPermissions.permission.id,
        );

        this.dataDetails = result.data.result;
        this.message = result.data.message;
        this.meta = result.data.meta;
        this.success = result.data.success;
      }
      common.setIsLoading(false);

      if (result.data?.error) {
        message.error(`${this.error.message}`);
      }

      return this.dataDetails;
    },
    async createRole(value: ICreateRole) {
      const common = useCommonStore();
      const result = await roleController().createRole(value);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data.push(this.transformToTableData(result.data?.result));
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
      common.setIsModalShow(false);
      common.setIsLoadingButton(false);
    },
    async updateRoleById(id: string, values: IUpdateRole) {
      const common = useCommonStore();
      const result = await roleController().updateRoleById(id, values);
      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          const index = this.data.findIndex(
            (x) => x.id === result.data?.result.id,
          );
          this.data[index] = this.transformToTableData(result.data?.result);
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
      common.setIsDrawerShow(false);
      common.setIsLoadingButton(false);
    },
    async deleteRoleById(roleId: string) {
      const result = await roleController().deleteRoleById(roleId);

      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = this.data.filter((x) => {
            return x.id != roleId;
          });
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
  },
});
