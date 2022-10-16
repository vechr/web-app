import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { topicController } from '@/applications/controllers';
import { ITopicData } from '@/domain';
import { useCommonStore } from '@/ui/store';

export const useTopicManagementStore = defineStore('topicManagement', {
  state: () => {
    return {
      message: '',
      data: [],
      dataDetails: {
        id: '',
        deviceId: '',
        name: '',
        description: '',
        widgetType: '',
        createdAt: '',
        updatedAt: '',
        topicEvents: [],
      },
      topicEdit: { name: '', description: '' },
      error: {
        code: '',
        message: '',
        params: Object,
      },
      meta: {},
    } as ITopicData;
  },
  getters: {
    topicColumnsSort() {
      return [
        {
          label: 'Name',
          value: 'name',
        },
        {
          label: 'Description',
          value: 'description',
        },
        {
          label: 'Created At',
          value: 'createdAt',
        },
        {
          label: 'Updated At',
          value: 'updatedAt',
        },
      ];
    },
    topicColumns() {
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
          title: 'Topic Event',
          dataIndex: 'topicEvents',
          key: 'topicEvents',
        },
        {
          title: 'Widget Type',
          dataIndex: 'widgetType',
          key: 'widgetType',
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
    topicList(state) {
      return state.data.map((topic) => ({
        id: topic.id,
        deviceId: topic.deviceId,
        name: topic.name,
        description: topic.description,
        widgetType: topic.widgetType,
        createdAt:
          topic.createdAt !== undefined
            ? new Date(topic.createdAt).toLocaleString('en-US')
            : topic.createdAt,
        updatedAt:
          topic.updatedAt !== undefined
            ? new Date(topic.updatedAt).toLocaleString('en-US')
            : topic.updatedAt,
        topicEvents: topic.topicEvents?.map((topicEvent) => topicEvent.name),
      }));
    },
  },
  actions: {
    async getTopicPagination(deviceId: string, params: Record<string, any>) {
      const common = useCommonStore();
      common.setIsLoading(true);

      const result = await topicController().getTopicListV2(deviceId, params);

      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.success = result.data?.success;
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
          this.meta = result.data?.meta;
        }
      }
      common.setIsLoading(false);
    },
    async getTopicList(deviceId: string) {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await topicController().getTopicList(deviceId);
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
    async getTopicById(deviceId: string, id: string) {
      const common = useCommonStore();
      const result = await topicController().getTopicById(deviceId, id);
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data?.message : 'Success!';
          this.topicEdit.name = result.data?.result.name;
          this.topicEdit.description = result.data?.result.description;
          this.dataDetails = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async createTopic(
      deviceId: string,
      value: { name: string; description: string; widgetType?: string },
    ) {
      if (value.widgetType === '') delete value.widgetType;
      const common = useCommonStore();
      const result = await topicController().createTopic(deviceId, value);
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
    async updateTopicById(
      deviceId: string,
      id: string,
      value: { name: string; description: string },
    ) {
      const common = useCommonStore();
      const result = await topicController().updateTopicById(
        deviceId,
        id,
        value,
      );
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
            (x) => x.id === result.data?.result.id,
          );
          this.data[index] = result.data?.result;
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async deleteTopicById(deviceId: string, id: string) {
      const result = await topicController().deleteTopicById(deviceId, id);
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
