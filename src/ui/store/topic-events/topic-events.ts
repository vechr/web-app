import { topicEventController } from '@/applications/controllers';
import { ITopicEventData } from '@/domain';
import { useCommonStore } from '@/ui/store';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';

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
      topicEventEdit: { id: '' ,name: '', description: '', eventExpression: {} },
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
    async getTopicEventList(topicId: string) {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await topicEventController().getTopicEventList(topicId);
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data?.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async getTopicEventById(topicId: string, id: string) {
      const common = useCommonStore();
      const result = await topicEventController().getTopicEventById(topicId, id);
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data?.message : 'Success!';
          this.dataDetails = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async createTopicEvent(
      topicId: string,
      value: { name: string; description: string; eventExpression: object }
    ) {
      const common = useCommonStore();
      const result = await topicEventController().createTopicEvent(topicId, value);
      if (result.data?.error) {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        if (result.status === 201) {
          this.message = result.data ? result.data?.message : 'Success!';
          this.data.push(result.data?.result);
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async updateTopicEventById(
      topicId: string,
      id: string,
      value: { name: string; description: string; eventExpression: object }
    ) {
      const common = useCommonStore();
      const result = await topicEventController().updateTopicEventById(topicId, id, value);
      if (result.data?.error) {
        common.setIsDrawerShow(false);
        common.setIsLoadingButton(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsDrawerShow(false);
        common.setIsLoadingButton(false);
        if (result.status === 200) {
          this.message = result.data ? result.data?.message : 'Success!';
          const index = this.data.findIndex(
            (x) => x.id === result.data?.result.id
          );
          this.data[index] = result.data?.result;
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async deleteTopicEventById(topicId: string, id: string) {
      const result = await topicEventController().deleteTopicEventById(topicId, id);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data?.message : 'Success!';
          this.data = this.data.filter((x) => {
            return x.id != id;
          });
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
  },
});