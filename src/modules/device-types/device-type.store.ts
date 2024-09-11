import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { DeviceTypeUsecase } from './device-type.usecase';
import { DeviceType, TDeviceTypeForm } from './device-type.entity';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useDeviceTypeStore = defineStore('device-type-store', () => {
  const usecase = ref(Container.get(DeviceTypeUsecase));

  const title = ref('DeviceType');
  const description = ref('DeviceType model');

  const fields = reactive<TDeviceTypeForm>({
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
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const deviceType = (await usecase.value.getById(id, false)) as DeviceType;

    if (deviceType) {
      fields.id!.value = deviceType.id;
      fields.name.value = deviceType.name;
      fields.description.value = deviceType.description ?? '';
      fields.createdAt!.value = dayjs(deviceType.createdAt);
      fields.updatedAt!.value = dayjs(deviceType.updatedAt);
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
});
