import { defineStore } from 'pinia';
import { commonController } from '@/applications/controllers';

export const useCommonStore = defineStore('commonStore', {
  state: () => {
    return {
      isLoadingActive: false,
      isModalShow: false,
      isLoadingButton: false,
      isDrawerShow: false,
    };
  },
  actions: {
    setIsLoading(status: boolean): void {
      this.isLoadingActive = commonController().setIsLoading(status);
    },
    setIsModalShow(status: boolean): void {
      this.isModalShow = commonController().setIsModalShow(status);
    },
    setIsLoadingButton(status: boolean): void {
      this.isLoadingButton = commonController().setIsLoadingButton(status);
    },
    setIsDrawerShow(status: boolean): void {
      this.isDrawerShow = commonController().setIsDrawerShow(status);
    },
  },
});
