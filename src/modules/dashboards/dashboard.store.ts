import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { DeviceUsecase } from '../devices/device.usecase';
import { DashboardUsecase } from './dashboard.usecase';
import { Dashboard, TDashboardForm } from './dashboard.entity';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useDashboardStore = defineStore('dashboard-store', () => {
  const usecase = ref(Container.get(DashboardUsecase));
  const deviceUsecase = ref(Container.get(DeviceUsecase));

  const title = ref('Dashboard');
  const description = ref('Dashboard modeling');
  const dashboards = ref<Dashboard[]>([]);

  const fields = reactive<TDashboardForm>({
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
    devices: {
      placehorder: 'Assign the devices',
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
    fields.devices.value = [];
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const dashboard = (await usecase.value.getById(id, false)) as Dashboard;

    if (dashboard) {
      fields.id!.value = dashboard.id;
      fields.name.value = dashboard.name;
      fields.description.value = dashboard.description ?? '';
      fields.devices.value = dashboard.devices.map(
        (dashboardDevice) => dashboardDevice.device.id,
      );
      fields.createdAt!.value = dayjs(dashboard.createdAt);
      fields.updatedAt!.value = dayjs(dashboard.updatedAt);
    }
  };

  const loadImportantData = async () => {
    // Implement the method that want to load
    fields.devices.options = await deviceUsecase.value.listDropdown();
  };

  return {
    onNew,
    objectSelected,
    loadImportantData,
    title,
    description,
    fields,
    usecase,
    dashboards,
  };
});
