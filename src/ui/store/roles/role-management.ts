import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { IRoleData } from '@/domain';
import { roleController } from '@/applications/controllers';

export const useRoleManagements = defineStore('roleManagement', {
  state: () => {
    return {
      message: '',
      data: [],
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
  actions: {
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
  },
});
