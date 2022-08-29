import { notificationEmailController } from '@/applications/controllers';
import { INotificationEmailData } from '@/domain';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { useCommonStore } from '..';

export const useNotificationEmailStore = defineStore('notificationEmail', {
  state: () => {
    return {
      message: '',
      data: [],
      dataDetails: {
        id: '',
        description: '',
        name: '',
        recipient: '',
        sender: '',
        createdAt: '',
        updatedAt: '',
      },
      notificationEmailEdit: {id: '', description: '', name: '', sender: '', recipient: ''},
      optionNotificationEmail: [],
      error: {
        code: '',
        message: '',
        params: Object,
      },
    } as INotificationEmailData;
  },
  getters: {
    notificationEmailTypeColumns() {
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
          title: 'Sender',
          dataIndex: 'sender',
          key: 'sender',
        },
        {
          title: 'Recipient',
          dataIndex: 'recipient',
          key: 'recipient',
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
    notificationEmailList(state) {
      return state.data.map((notificationEmail) => ({
        id: notificationEmail.id,
        description: notificationEmail.description,
        name: notificationEmail.name,
        recipient: notificationEmail.recipient,
        sender: notificationEmail.sender,
        createdAt:
        notificationEmail.createdAt !== undefined
            ? new Date(notificationEmail.createdAt).toLocaleString('en-US')
            : notificationEmail.createdAt,
        updatedAt:
        notificationEmail.updatedAt !== undefined
            ? new Date(notificationEmail.updatedAt).toLocaleString('en-US')
            : notificationEmail.updatedAt,
      }));
    },
    hashMapNotificationEmailList(state) {
      const data = new Map();
      if (state.data.length > 0) {
        state.data.forEach(val => {
          data.set(val.id, val.name)
        });
      }
      return data;
    }
  },
  actions: {
    async getOptionNotificationEmail() {
      const result = await notificationEmailController().getNotificationEmailList();
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.optionNotificationEmail = this.data.map((email) => ({
            value: email.id,
            label: email.name,
          }));
          this.error = result.data?.error;
        }
      }
    },
    async getNotificationEmailList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await notificationEmailController().getNotificationEmailList();
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
    async getNotificationEmailById(id: string) {
      const common = useCommonStore();
      const result = await notificationEmailController().getNotificationEmailById(id);
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data?.message : 'Success!';
          this.dataDetails = result.data?.result;
          this.notificationEmailEdit.id = this.dataDetails.id
          this.notificationEmailEdit.name = this.dataDetails.name
          this.notificationEmailEdit.description = this.dataDetails.description
          this.notificationEmailEdit.sender = this.dataDetails.sender
          this.notificationEmailEdit.recipient = this.dataDetails.recipient
          this.error = result.data?.error;
        }
      }
    },
    async createNotificationEmail(
      value: { name: string; description: string; sender: string, recipient: string }
    ) {
      const common = useCommonStore();
      const result = await notificationEmailController().createNotificationEmail(value);
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
    async updateNotificationEmailById(
      id: string,
      value: { name: string; description: string; sender: string, recipient: string }
    ) {
      const common = useCommonStore();
      const result = await notificationEmailController().updateNotificationEmailById(id, value);
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
    async deleteNotificationEmailById(id: string) {
      const result = await notificationEmailController().deleteNotificationEmailById(id);
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
    }
  }
})