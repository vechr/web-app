import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { NotificationEmailUsecase } from '../notification-emails/notification-email.usecase';
import { TopicUsecase } from '../topics/topic.usecase';
import { TopicEvent, TTopicEventForm } from './topic-event.entity';
import { TopicEventUsecase } from './topic-event.usecase';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useTopicEventStore = defineStore('topic-event-store', () => {
  const usecase = ref(Container.get(TopicEventUsecase));
  const usecaseNotificationEmails = ref(
    Container.get(NotificationEmailUsecase),
  );
  const usecaseTopic = ref(Container.get(TopicUsecase));

  const title = ref('TopicEvent');
  const description = ref('TopicEvent model');

  const fields = reactive<TTopicEventForm>({
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
      rules: [{ required: false, message: 'Please input your description!' }],
      rows: 5,
    },
    topicId: {
      placehorder: 'Assign the Topic',
      options: [],
      type: EFormItem.Select,
      rules: [{ required: true, message: 'Please assign the Topic!' }],
      value: '',
    },
    bodyEmail: {
      placehorder: 'Please input a bodyEmail!',
      type: EFormItem.TextArea,
      value: '',
      rules: [{ required: true, message: 'Please input your bodyEmail!' }],
      rows: 5,
    },
    htmlBodyEmail: {
      placehorder: 'Please input a htmlBodyEmail!',
      type: EFormItem.TextArea,
      value: '',
      rules: [{ required: true, message: 'Please input your htmlBodyEmail!' }],
      rows: 5,
    },
    eventExpression: {
      placehorder: 'Please enter a eventExpression!',
      type: EFormItem.Input,
      value: '',
      rules: [
        { required: true, message: 'Please input your eventExpression!' },
      ],
      allowClear: true,
      bordered: true,
    },
    notificationEmails: {
      placehorder: 'Assign the Notification Emails',
      options: [],
      type: EFormItem.SelectMultiple,
      mode: 'tags',
      value: [],
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
    fields.eventExpression.value = '';
    fields.bodyEmail.value = '';
    fields.htmlBodyEmail.value = '';
    fields.topicId.value = '';
    fields.notificationEmails.value = [];
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const topicEvent = (await usecase.value.getById(id, false)) as TopicEvent;

    if (topicEvent) {
      fields.id!.value = topicEvent.id;
      fields.name.value = topicEvent.name;
      fields.description.value = topicEvent.description ?? '';
      fields.eventExpression.value = topicEvent.eventExpression ?? '';
      fields.bodyEmail.value = topicEvent.bodyEmail ?? '';
      fields.htmlBodyEmail.value = topicEvent.htmlBodyEmail ?? '';
      fields.topicId.value = topicEvent.topicId ?? '';
      fields.notificationEmails.value = topicEvent.notificationEmails.map(
        (notificationEmail) => notificationEmail.id,
      );
      fields.createdAt!.value = dayjs(topicEvent.createdAt);
      fields.updatedAt!.value = dayjs(topicEvent.updatedAt);
    }
  };

  const loadImportantData = async () => {
    // Implement the method that want to load
    fields.notificationEmails.options =
      await usecaseNotificationEmails.value.listDropdown();
    fields.topicId.options = await usecaseTopic.value.listDropdown();
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
});
