import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { TLoggingData } from './logging.entity';

export const useLoggingStore = defineStore('logging-store', () => {
  const urlTopic = ref('');

  const data = ref<TLoggingData[]>([]);
  const message = ref('');
  const statusConnection = reactive({
    message: 'Not Connected!',
    process: 'Finished',
  });

  return {
    urlTopic,
    data,
    message,
    statusConnection,
  };
});
