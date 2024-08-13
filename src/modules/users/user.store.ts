import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { RoleUsecase } from '../roles/role.usecase';
import { SiteUsecase } from '../sites/site.usecase';
import { UserUsecase } from './user.usecase';
import { TUserForm, User } from './user.entity';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useUserStore = defineStore('user-store', () => {
  const usecase = ref(Container.get(UserUsecase));
  const usecaseRoles = ref(Container.get(RoleUsecase));
  const usecaseSites = ref(Container.get(SiteUsecase));

  const title = ref('User');
  const description = ref('Employee or User for account');

  const fields = reactive<TUserForm>({
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
    fullName: {
      type: EFormItem.Input,
      value: '',
      placehorder: 'Please input the full name!',
      disabled: false,
      bordered: true,
    },
    email: {
      type: EFormItem.Input,
      value: '',
      placehorder: 'please enter the email address!',
      disabled: false,
      bordered: true,
    },
    phoneNumber: {
      type: EFormItem.Input,
      value: '',
      placehorder: 'please enter the phone number!',
      disabled: false,
      bordered: true,
    },
    password: {
      type: EFormItem.InputPassword,
      value: '',
      placehorder: 'Please enter the password!',
      rules: [{ required: true, message: 'Please input the password!' }],
    },
    confirmPassword: {
      type: EFormItem.InputPassword,
      value: '',
      placehorder: 'please enter the confirm password!',
      rules: [
        { required: true, message: 'Please input the confirm password!' },
      ],
    },
    roles: {
      placehorder: 'Assign the Roles',
      options: [],
      type: EFormItem.SelectMultiple,
      mode: 'tags',
      value: [],
    },
    siteId: {
      placehorder: 'Assign the Site',
      options: [],
      type: EFormItem.Select,
      rules: [{ required: true, message: 'Please assign the site!' }],
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
    fields.fullName.value = '';
    fields.email.value = '';
    fields.description.value = '';
    fields.password.value = '';
    fields.confirmPassword.value = '';
    fields.phoneNumber.value = '';
    fields.roles.value = [];
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const user = (await usecase.value.getById(id, false)) as User;

    if (user) {
      fields.id!.value = user.id;
      fields.name.value = user.name;
      fields.fullName.value = user.fullName ?? '';
      fields.email.value = user.email ?? '';
      fields.description.value = user.description ?? '';
      fields.phoneNumber.value = user.phoneNumber ?? '';
      fields.roles.value = user.roles.map((userRole) => userRole.role.id);
      fields.siteId.value = user.siteId;
      fields.createdAt!.value = dayjs(user.createdAt);
      fields.updatedAt!.value = dayjs(user.updatedAt);
    }
  };

  const loadImportantData = async () => {
    // Implement the method that want to load
    fields.roles.options = await usecaseRoles.value.listDropdown();
    fields.siteId.options = await usecaseSites.value.listDropdown();
  };

  return {
    onNew,
    objectSelected,
    loadImportantData,
    description,
    title,
    fields,
    usecase,
  };
});
