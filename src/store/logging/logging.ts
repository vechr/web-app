import { defineStore } from "pinia";

interface ILoggingData {
  urlTopic: string;
  data: {
    no: number,
    message: string
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
  getters: {
    loggingColumns() {
      return [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no'
        },
        {
          title: 'Message',
          dataIndex: 'message',
          key: 'message',
        }
      ]
    },
  },
  actions: {
    async resetData() {
      this.data = [];
      this.message = "";
    }
  }
})