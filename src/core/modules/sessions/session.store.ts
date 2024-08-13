import { defineStore } from 'pinia';
import Container from 'typedi';
import { ref } from 'vue';
import { SessionUsecase } from '@/core/modules/sessions/session.usecase';

export const useSessionStore = defineStore('session-store', () => {
  const usecase = ref(Container.get(SessionUsecase));

  return {
    usecase,
  };
});
