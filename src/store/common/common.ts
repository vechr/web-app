import { defineStore } from "pinia";

export const useCommonStore = defineStore('commonStore', {
  state: () => {
    return {
      isLoadingActive: false,
      isModalShow: false,
      isLoadingButton: false,
      isDrawerShow: false,
    }
  },
  actions: {
    setIsLoading(status: boolean): void {
      this.isLoadingActive = status;
    },
    setIsModalShow(status: boolean): void {
      this.isModalShow = status;
    },
    setIsLoadingButton(status: boolean): void {
      this.isLoadingButton = status;
    },
    setIsDrawerShow(status: boolean): void {
      this.isDrawerShow = status;
    }
  }
});