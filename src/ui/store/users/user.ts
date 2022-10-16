import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { useCommonStore } from '../common/common';
import { IUserData } from '@/domain/user/user.store';
import { userController } from '@/applications/controllers';
import { TUserFullInformation } from '@/domain';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      message: '',
      success: true,
      data: [],
      error: {
        code: '',
        message: '',
        params: {},
      },
      dataDetails: undefined,
      meta: {},
    } as IUserData;
  },
  actions: {
    async getUserById(
      userId: string,
    ): Promise<TUserFullInformation | undefined> {
      const common = useCommonStore();
      const result = await userController().getUserById(userId);
      if (result.data) {
        this.error = result.data.error;
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
  },
});
