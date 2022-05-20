import { message } from "ant-design-vue";
import axios from "axios";
import { defineStore } from "pinia";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
interface ILoggingData {
  urlTopic: string;
  data: {
    no: number,
    message: any
  }[];
  message: string
  statusConnection: {
    message: string
    process: string
  }
}

export const useLoggingStore = defineStore('logging', {
  state: () => {
    return {
      urlTopic: "",
      data: [],
      message: "",
      statusConnection: {
        message: "Not Connected!",
        process: "Finished"
      }
    } as ILoggingData
  },
  actions: {
    async resetData() {
      this.data = [];
      this.message = "";
    },
    async getHistoricalData(payload: {dashboardId: string | string[], deviceId: string | string[], topicId: string | string[], topic: string | string[]}) {
      await axios.post(`/api/device/${payload.deviceId}/topic/query`, payload)
      .then((res) => {
        if (res.status === 200) {
          this.data = res.data.map((val: { _value: any; }, index: number) => ({no: index + 1, message: val._value}))
        }
      })
      .catch((err) => {
        message.error(`${err.code} ${err.message}`);
      })
    }
  }
})