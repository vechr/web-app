import { defineStore } from 'pinia';
import Container from 'typedi';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { PermissionUsecase } from '../permissions/permission.usecase';
import { RoleUsecase } from './role.usecase';
import { Role, TRoleForm } from './role.entity';
import { EFormItem } from '@/core/base/domain/entities/protocol';

export const useRoleStore = defineStore('role-store', () => {
  const usecase = ref(Container.get(RoleUsecase));
  const usecasePermission = ref(Container.get(PermissionUsecase));

  const title = ref('Role');
  const description = ref(
    'Role can have multiple permission inside of. Role is attached to the role group',
  );

  const fields = reactive<TRoleForm>({
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
    permissions: {
      placehorder: 'Assign the Permissions',
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
    fields.permissions.value = [];
    fields.createdAt!.value = undefined;
    fields.updatedAt!.value = undefined;
  };

  const objectSelected = async (id: string) => {
    // Implement on object selected
    const role = (await usecase.value.getById(id, false)) as Role;

    if (role) {
      fields.id!.value = role.id;
      fields.name.value = role.name;
      fields.description.value = role.description ?? '';
      fields.permissions.value = role.permissions.map(
        (rolePermissionRole) => rolePermissionRole.permission.id,
      );
      fields.createdAt!.value = dayjs(role.createdAt);
      fields.updatedAt!.value = dayjs(role.updatedAt);
    }
  };

  const loadImportantData = async () => {
    // Implement the method that want to load
    fields.permissions.options = await usecasePermission.value.listDropdown();
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
