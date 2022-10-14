import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import router from '../../router';
import { useCommonStore } from '../common/common';
import { ISessionData } from '@/domain/sessions/session-store';
import { sessionController } from '@/applications/controllers';

export const useSessionStore = defineStore('session', {
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
      meta: {},
    } as ISessionData;
  },
  actions: {
    async statusToken(): Promise<boolean> {
      const result = await sessionController().statusToken();
      if (result.data?.success) {
        return result.data.success;
      }
      return false;
    },
    async login(value: { username: string; password: string }) {
      const common = useCommonStore();
      const result = await sessionController().login(value);

      if (result.data) {
        common.setIsLoading(false);
        this.error = result.data.error;
        this.message = result.data ? result.data?.message : 'Success!';
        this.success = result.data.success;
        this.meta = result.data.meta;
        this.data = result.data.result;
      }

      if (result.data?.error) {
        common.setIsLoading(false);
        message.error(`${this.error.code} ${this.error.message}`);
      }
      if (result.data?.success) {
        router.push({ name: 'home' });
      }
    },
    async refresh(refreshToken: string) {
      const common = useCommonStore();
      const result = await sessionController().refresh(refreshToken);

      if (result.data) {
        common.setIsLoading(false);
        this.error = result.data.error;
        this.message = result.data.message;
        this.message = result.data ? result.data?.message : 'Success!';
        this.meta = result.data.meta;
        this.data = result.data.result;
      }

      if (result.data?.error) {
        common.setIsLoading(false);
        message.error(`${this.error.code} ${this.error.message}`);
      }
    },
  },
});
