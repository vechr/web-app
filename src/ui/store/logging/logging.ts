import { loggingController } from '@/applications/controllers';
import { ILoggingData } from '@/domain';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';

export const useLoggingStore = defineStore('logging', {
  state: () => {
    return {
      urlTopic: '',
      data: [],
      message: '',
      statusConnection: {
        message: 'Not Connected!',
        process: 'Finished',
      },
    } as ILoggingData;
  },
  actions: {
    async resetData() {
      this.data = [];
      this.message = '';
    },
    async getHistoricalData(payload: {
      dashboardId: string | string[];
      deviceId: string | string[];
      topicId: string | string[];
      topic: string | string[];
    }) {
      const result = await loggingController().getHistoricalData(payload);
      if (result.data?.error) {
        message.error(`${result.data.error.code} ${result.data.message}`);
      } else {
        if (result.status === 200) {
          this.data = result.data?.result.map((val: { _value: any }, index: number) => ({
            no: index + 1,
            message: val._value,
          }));
        }
      }
    },
  },
});
