import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { DeviceUsecase } from '../devices/device.usecase';
import { Topic, TTopicForm } from './topic.entity';
import { TopicUsecase } from './topic.usecase';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useTopicStore = defineStore('topic-store', () => {
  const usecase = ref(Container.get(TopicUsecase));
  const usecaseDevice = ref(Container.get(DeviceUsecase));

  const title = ref('Topic');
  const description = ref('Topic model');

  const fields = reactive<TTopicForm>({
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
      rules: [
        { required: true, message: 'Please input your name!' },
        {
          required: true,
          pattern: new RegExp(/[\\/]\S*$/gm),
          message:
            'Please use / character at the beginning and cannot contain any spaces. For example /mytopic, /my-topic!',
        },
      ],
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
    deviceId: {
      placehorder: 'Assign the Device',
      options: [],
      type: EFormItem.Select,
      rules: [{ required: true, message: 'Please assign the Device!' }],
      value: '',
    },
    widgetType: {
      placehorder: 'Assign the Widget',
      options: [
        { value: 'BAR', label: 'BAR' },
        { value: 'BUBBLE', label: 'BUBBLE' },
        { value: 'DOUGHNUT', label: 'DOUGHNUT' },
        { value: 'PIE', label: 'PIE' },
        { value: 'GAUGE', label: 'GAUGE' },
        { value: 'LINE', label: 'LINE' },
        { value: 'POLAR', label: 'POLAR' },
        { value: 'RADAR', label: 'RADAR' },
        { value: 'SCATTER', label: 'SCATTER' },
        { value: 'MAPS', label: 'MAPS' },
      ],
      type: EFormItem.Select,
      rules: [{ required: true, message: 'Please assign the widget type!' }],
      value: '',
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
    fields.deviceId.value = '';
    fields.widgetType.value = '';
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const topic = (await usecase.value.getById(id, false)) as Topic;

    if (topic) {
      fields.id!.value = topic.id;
      fields.name.value = topic.name;
      fields.description.value = topic.description ?? '';
      fields.deviceId.value = topic.deviceId;
      fields.widgetType.value = topic.widgetType ?? '';
      fields.createdAt!.value = dayjs(topic.createdAt);
      fields.updatedAt!.value = dayjs(topic.updatedAt);
    }
  };

  const loadImportantData = async () => {
    // Implement the method that want to load
    fields.deviceId.options = await usecaseDevice.value.listDropdown();
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
