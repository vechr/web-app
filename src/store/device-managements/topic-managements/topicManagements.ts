import { useCommonStore } from "@/store";
import { IError, ITopic } from "@/types";
import { message } from "ant-design-vue";
import axios from "axios";
import { defineStore } from "pinia";

interface ITopicData {
  message: string,
  data: ITopic[],
  dataDetails: ITopic,
  topicEdit: {name: string, description: string},
  error: IError
}

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_THINGS;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

export const useTopicManagementStore = defineStore('topicManagement', {
  state: () => {
    return {
      message: "",
      data: [],
      dataDetails: {
        id: "",
        deviceId: "",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        topicEvents: []
      },
      topicEdit: {name: "", description: ""},
      error: {
        code: "",
        message: "",
        params: Object
      }
    } as ITopicData
  },
  getters: {
    topicColumns() {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: 'Topic Event',
          dataIndex: 'topicEvents',
          key: 'topicEvents'
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'action'
        }
      ]
    },
    topicList(state) {
      return (
        state.data.map((topic) => ({
          id: topic.id,
          deviceId: topic.deviceId,
          name: topic.name,
          description: topic.description,
          createdAt: topic.createdAt !== undefined ? new Date(topic.createdAt).toLocaleString('en-US') : topic.createdAt,
          updatedAt: topic.updatedAt !== undefined ? new Date(topic.updatedAt).toLocaleString('en-US') : topic.updatedAt,
          topicEvents: topic.topicEvents?.map((topicEvent) => topicEvent.name)
        }))
      )
    }
  },
  actions: {
    async getTopicList<T>(deviceId: T) {
      const common = useCommonStore();
      common.setIsLoading(true);
      await axios.get(`/device/${deviceId}/topic`)
      .then((res) => {
        common.setIsLoading(false);
        if (res.status === 200) {
          this.message = res.data.message;
          this.data = res.data.result;
          this.error = res.data.error;
        }
      })
      .catch((err) => {
        common.setIsLoading(false);
        this.error = err.response.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      })
    },
    async getTopicById<T>(deviceId: T, id: string) {
      const common = useCommonStore();
      await axios.get(`/device/${deviceId}/topic/${id}`)
      .then((res) => {
        common.setIsLoading(false);
        if (res.status === 200) {
          this.message = res.data.message;
          this.topicEdit.name = res.data.result.name;
          this.topicEdit.description = res.data.result.description;
          this.dataDetails = res.data.result;
          this.error = res.data.error;
        }
      })
      .catch((err) => {
        common.setIsLoading(false);
        this.error = err.response.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      })
    },
    async createTopic<T>(deviceId: T, value: {name: string, description: string}) {
      const common = useCommonStore();
      await axios.post(`/device/${deviceId}/topic`, JSON.stringify(value, null, 2))
      .then((res) => {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        if (res.status === 201) {
          this.message = res.data.message;
          this.data.push(res.data.result);
          this.error = res.data.error;
          message.success(`${res.status} ${this.message}`);
        }
      })
      .catch((err) => {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        this.error = err.response.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      })
    },
    async updateTopicById<T>(deviceId: T ,id: string, value: { name: string, description: string }){
      const common = useCommonStore();
      await axios.patch(`/device/${deviceId}/topic/${id}`, value)
        .then((res) => {
          common.setIsDrawerShow(false);
          common.setIsLoadingButton(false);
          if (res.status === 200) {
            this.message = res.data.message;
            const index = this.data.findIndex((x) => x.id === res.data.result.id)
            this.data[index] = res.data.result;
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          common.setIsDrawerShow(false);
          common.setIsLoadingButton(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async deleteTopicById<T>(deviceId: T, id: string) {
      await axios.delete(`/device/${deviceId}/topic/${id}`)
      .then((res) => {
        if (res.status === 200) {
          this.message = res.data.message;
          this.data = this.data.filter(x => { return x.id != id })
          this.error = res.data.error;
          message.success(`${res.status} ${this.message}`);
        }
      })
      .catch((err) => {
        this.error = err.response.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      })
    }
  }
})