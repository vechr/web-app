import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import router from '../../router';
import { useCommonStore } from '../common/common';
import { ISessionData } from '@/domain/sessions/session-store';
import { sessionController } from '@/applications/controllers';
import { IError } from '@/domain';

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
      mySession: undefined,
    } as ISessionData;
  },
  actions: {
    async logout(): Promise<boolean> {
      const common = useCommonStore();
      const result = await sessionController().logout();
      if (result.data) this.error = result.data.error;

      this.mySession = undefined;
      this.data = [];

      common.setIsLoading(false);

      this.message = result.data ? result.data?.message : 'Success!';

      if (result.data?.error) {
        message.error(`${this.error.message}`);
      }

      if (!result.data?.error) message.success(`${this.message}`);

      if (result.data?.success) {
        return result.data.success;
      }

      return false;
    },
    async statusToken(): Promise<{ status: boolean; error: IError }> {
      const result = await sessionController().statusToken();
      if (result.data) this.error = result.data.error;

      return {
        status: result.data?.success ? result.data.success : false,
        error: this.error,
      };
    },
    async login(value: { username: string; password: string }) {
      const common = useCommonStore();
      const result = await sessionController().login(value);

      if (result.data) {
        this.error = result.data.error;
        this.message = result.data ? result.data?.message : 'Success!';
        this.success = result.data.success;
        this.meta = result.data.meta;
        this.data = result.data.result;
      }

      if (result.data?.error) {
        message.error(`${this.error.message}`);
      }

      if (!result.data?.error) message.success(`${this.message}`);

      if (result.data?.success) {
        router.push({ name: 'home' });
      }

      common.setIsLoading(false);
    },
    async refresh(): Promise<{ status: boolean; error: IError }> {
      const result = await sessionController().refresh();

      if (result.data) {
        this.error = result.data.error;
        this.message = result.data.message;
        this.message = result.data ? result.data?.message : 'Success!';
        this.meta = result.data.meta;
        this.data = result.data.result;
      }

      return {
        status: result.data?.success ? result.data.success : false,
        error: this.error,
      };
    },
    async userMe(): Promise<void> {
      const result = await sessionController().mySession();
      if (result.data?.success) {
        this.mySession = result.data?.result;
      }
    },
  },
});
