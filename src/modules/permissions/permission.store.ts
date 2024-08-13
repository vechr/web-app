import { defineStore } from 'pinia';
import Container from 'typedi';
import { ref } from 'vue';
import { PermissionUsecase } from '@/modules/permissions/permission.usecase';

export const usePermissionStore = defineStore('permission-store', () => {
  const usecase = ref(Container.get(PermissionUsecase));

  return {
    usecase,
  };
});
