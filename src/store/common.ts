import { defineStore } from "pinia";

export const useCommonStore = defineStore('commonStore', {
  state: () => {
    return {
      isLoadingActive: false
    }
  },
  actions: {
    setIsLoading(status: boolean): void{
      this.isLoadingActive = status;
    }
  }
});