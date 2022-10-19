import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { permissionController } from '@/applications/controllers/permission/permission.controller';
import { IPermissionData } from '@/domain';
import { useCommonStore } from '@/ui/store';

export const usePermissionManagementStore = defineStore(
  'permissionManagement',
  {
    state: () => {
      return {
        message: '',
        data: [],
        dataDetails: undefined,
        optionPermissions: [],
        success: true,
        error: {
          code: '',
          message: '',
          params: {},
        },
        meta: {},
      } as IPermissionData;
    },
    getters: {
      permissionColumnsSort() {
        return [
          {
            label: 'Permission Name',
            value: 'name',
          },
          {
            label: 'Description',
            value: 'description',
          },
          {
            label: 'Alias',
            value: 'alias',
          },
          {
            label: 'Permission Type',
            value: 'permissionType',
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
      permissionColumns() {
        return [
          {
            title: 'Permission Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Permission Type',
            dataIndex: 'permissionType',
            key: 'permissionType',
          },
        ];
      },
    },
    actions: {
      async getOptionPermission() {
        const result = await permissionController().getPermissionAll();
        if (result.data?.error) {
          this.error = result.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        } else {
          if (result.status === 200) {
            this.message = result.data ? result.data.message : 'Success!';
            this.data = result.data?.result;
            this.optionPermissions = this.data.map((permission) => ({
              value: permission.id ? permission.id : '',
              label: permission.name ? permission.name : '',
            }));
            this.error = result.data?.error;
          }
        }
      },
      async getPermissionPagination(params: Record<string, any>) {
        const common = useCommonStore();
        common.setIsLoading(true);

        const result = await permissionController().getPermissions(params);

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
    },
  },
);
