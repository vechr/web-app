import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { DeviceTypeUsecase } from '../device-types/device-type.usecase';
import { Device, TDeviceForm } from './device.entity';
import { DeviceUsecase } from './device.usecase';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useDeviceStore = defineStore('device-store', () => {
  const usecase = ref(Container.get(DeviceUsecase));
  const usecaseDeviceType = ref(Container.get(DeviceTypeUsecase));

  const title = ref('Device');
  const description = ref('Device model');

  const fields = reactive<TDeviceForm>({
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
    deviceTypeId: {
      placehorder: 'Assign the device type!',
      options: [],
      type: EFormItem.Select,
      value: '',
    },
    isActive: {
      type: EFormItem.Checkbox,
      text: 'Is the device active?',
      value: false,
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
    fields.deviceTypeId.value = '';
    fields.isActive.value = false;
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const device = (await usecase.value.getById(id, false)) as Device;

    if (device) {
      fields.id!.value = device.id;
      fields.name.value = device.name;
      fields.description.value = device.description ?? '';
      fields.deviceTypeId.value = device.deviceType.id;
      fields.isActive.value = device.isActive;
      fields.createdAt!.value = dayjs(device.createdAt);
      fields.updatedAt!.value = dayjs(device.updatedAt);
    }
  };

  const loadImportantData = async () => {
    // Implement the method that want to load
    fields.deviceTypeId.options = await usecaseDeviceType.value.listDropdown();
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
