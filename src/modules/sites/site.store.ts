import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { SiteUsecase } from './site.usecase';
import { Site, TSiteForm } from './site.entity';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useSiteStore = defineStore('site-store', () => {
  const usecase = ref(Container.get(SiteUsecase));

  const title = ref('Site');
  const description = ref('Site is a location of the user');

  const fields = reactive<TSiteForm>({
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
    code: {
      placehorder: 'Please enter a code!',
      type: EFormItem.Input,
      value: '',
      rules: [{ required: true, message: 'Please input your code!' }],
      allowClear: true,
      bordered: true,
    },
    location: {
      placehorder: 'Please enter a location!',
      type: EFormItem.Input,
      value: '',
      rules: [{ required: true, message: 'Please input your location!' }],
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
    fields.code.value = '';
    fields.location.value = '';
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const site = (await usecase.value.getById(id, false)) as Site;

    if (site) {
      fields.id!.value = site.id;
      fields.name.value = site.name;
      fields.description.value = site.description ?? '';
      fields.code.value = site.code;
      fields.location.value = site.location;
      fields.createdAt!.value = dayjs(site.createdAt);
      fields.updatedAt!.value = dayjs(site.updatedAt);
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
