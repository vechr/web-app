import { useCommonStore } from '@/store';
import { IError, ITopicEvent } from '@/types';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { defineStore } from 'pinia';

interface ITopicEventData {
  message: string;
  data: ITopicEvent[];
  dataDetails: ITopicEvent;
  topicEventEdit: {
    name: string;
    description: string;
    eventExpression: object;
  };
  error: IError;
}

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_THINGS;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

export const useTopicEventStore = defineStore('topicEvent', {
  state: () => {
    return {
      message: '',
      data: [],
      dataDetails: {
        id: '',
        topicId: '',
        name: '',
        description: '',
        eventExpression: {},
        createdAt: '',
        updatedAt: '',
      },
      topicEventEdit: { name: '', description: '', eventExpression: {} },
      error: {
        code: '',
        message: '',
        params: Object,
      },
    } as ITopicEventData;
  },
  getters: {
    topicEventColumns() {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Event Expression',
          dataIndex: 'eventExpression',
          key: 'eventExpression',
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
          key: 'action',
        },
      ];
    },
    topicEventList(state) {
      return state.data.map((topicEvent) => ({
        id: topicEvent.id,
        topicId: topicEvent.topicId,
        name: topicEvent.name,
        description: topicEvent.description,
        eventExpression: topicEvent.eventExpression,
        createdAt:
          topicEvent.createdAt !== undefined
            ? new Date(topicEvent.createdAt).toLocaleString('en-US')
            : topicEvent.createdAt,
        updatedAt:
          topicEvent.updatedAt !== undefined
            ? new Date(topicEvent.updatedAt).toLocaleString('en-US')
            : topicEvent.updatedAt,
      }));
    },
  },
  actions: {
    async getTopicEventList<T>(topicId: T) {
      const common = useCommonStore();
      common.setIsLoading(true);
      await axios
        .get(`/topic/${topicId}/topic-events`)
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
        });
    },
    async getTopicEventById<T>(topicId: T, id: string) {
      const common = useCommonStore();
      await axios
        .get(`/topic/${topicId}/topic-events/${id}`)
        .then((res) => {
          common.setIsLoading(false);
          if (res.status === 200) {
            this.message = res.data.message;
            this.topicEventEdit.name = res.data.result.name;
            this.topicEventEdit.description = res.data.result.description;
            this.topicEventEdit.eventExpression =
              res.data.result.eventExpression;
            this.dataDetails = res.data.result;
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          common.setIsLoading(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    async createTopicEvent<T>(
      topicId: T,
      value: { name: string; description: string; eventExpression: object }
    ) {
      const common = useCommonStore();
      await axios
        .post(`/topic/${topicId}/topic-events`, JSON.stringify(value, null, 2))
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
        });
    },
    async updateTopicEventById<T>(
      topicId: T,
      id: string,
      value: { name: string; description: string; eventExpression: object }
    ) {
      const common = useCommonStore();
      await axios
        .patch(`/topic/${topicId}/topic-events/${id}`, value)
        .then((res) => {
          common.setIsDrawerShow(false);
          common.setIsLoadingButton(false);
          if (res.status === 200) {
            this.message = res.data.message;
            const index = this.data.findIndex(
              (x) => x.id === res.data.result.id
            );
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
        });
    },
    async deleteTopicEventById<T>(topicId: T, id: string) {
      await axios
        .delete(`/topic/${topicId}/topic-events/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = this.data.filter((x) => {
              return x.id != id;
            });
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
  },
});
