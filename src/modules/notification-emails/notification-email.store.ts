import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import {
  NotificationEmail,
  TNotificationEmailForm,
} from './notification-email.entity';
import { NotificationEmailUsecase } from './notification-email.usecase';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useNotificationEmailStore = defineStore(
  'notification-email-store',
  () => {
    const usecase = ref(Container.get(NotificationEmailUsecase));

    const title = ref('NotificationEmail');
    const description = ref('NotificationEmail model');

    const fields = reactive<TNotificationEmailForm>({
      id: {
        placehorder: 'Automatically generated once object is created',
        disabled: true,
        type: EFormItem.Input,
        value: '',
      },
      name: {
        placehorder: 'Please enter a name!',
        type: EFormItem.Input,
        value: '',
        rules: [{ required: true, message: 'Please input your name!' }],
        allowClear: true,
        bordered: true,
      },
      description: {
        placehorder: 'Please input a description!',
        type: EFormItem.TextArea,
        value: '',
        rules: [{ required: true, message: 'Please input your description!' }],
        rows: 5,
      },
      sender: {
        placehorder: 'Please enter a sender!',
        type: EFormItem.Input,
        value: '',
        rules: [
          {
            required: true,
            pattern: new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/gm),
            message:
              'Please input sender email with correct format for example: me@mail.com!',
          },
        ],
        allowClear: true,
        bordered: true,
      },
      recipient: {
        placehorder: 'Please enter a recipient!',
        type: EFormItem.Input,
        value: '',
        rules: [
          {
            required: true,
            pattern: new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/gm),
            message:
              'Please input recipient email with correct format for example: me@mail.com!',
          },
        ],
        allowClear: true,
        bordered: true,
      },
      createdAt: {
        placehorder: 'Automatically generated once object is created',
        type: EFormItem.DatePicker,
        disabled: true,
      },
      updatedAt: {
        placehorder: 'Automatically generated once object is created',
        type: EFormItem.DatePicker,
        disabled: true,
      },
    });

    const onNew = () => {
      // Implement when New is triggered
      fields.id!.value = '';
      fields.name.value = '';
      fields.description.value = '';
      fields.sender.value = '';
      fields.recipient.value = '';
      fields.createdAt!.value = undefined;
      fields.updatedAt!.value = undefined;
    };

    const objectSelected = async (id: string) => {
      // Implement on object selected
      const notificationEmail = (await usecase.value.getById(
        id,
        false,
      )) as NotificationEmail;

      if (notificationEmail) {
        fields.id!.value = notificationEmail.id;
        fields.name.value = notificationEmail.name;
        fields.description.value = notificationEmail.description ?? '';
        fields.sender.value = notificationEmail.sender;
        fields.recipient.value = notificationEmail.recipient;
        fields.createdAt!.value = dayjs(notificationEmail.createdAt);
        fields.updatedAt!.value = dayjs(notificationEmail.updatedAt);
      }
    };

    const loadImportantData = async () => {
      // Implement the method that want to load
    };

    return {
      onNew,
      objectSelected,
      loadImportantData,
      title,
      description,
      fields,
      usecase,
    };
  },
);
