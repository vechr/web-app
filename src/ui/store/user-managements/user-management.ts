import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { useCommonStore } from '../common/common';
import { IUserData } from '@/domain/user/user.store';
import { userController } from '@/applications/controllers';
import { ICreateUser, IUpdateUser, TUserFullInformation } from '@/domain';

export const useUserManagementStore = defineStore('userManagement', {
  state: () => {
    return {
      message: '',
      success: true,
      data: [],
      userUpdate: { roles: [], siteId: '' },
      error: {
        code: '',
        message: '',
        params: {},
      },
      dataDetails: undefined,
      meta: {},
    } as IUserData;
  },
  getters: {
    userColumnsSort() {
      return [
        {
          label: 'Description',
          value: 'description',
        },
        {
          label: 'Full Name',
          value: 'fullName',
        },
        {
          label: 'Email Address',
          value: 'emailAddress',
        },
        {
          label: 'Phone Number',
          value: 'phoneNumber',
        },
        {
          label: 'Username',
          value: 'username',
        },
        {
          label: 'Created At',
          value: 'createdAt',
        },
        {
          label: 'Updated At',
          value: 'updatedAt',
        },
      ];
    },
    userColumns() {
      return [
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          key: 'fullName',
        },
        {
          title: 'Email Address',
          dataIndex: 'emailAddress',
          key: 'emailAddress',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'action',
        },
      ];
    },
  },
  actions: {
    transformToTableData(data: TUserFullInformation) {
      return {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        emailAddress: data.emailAddress,
        phoneNumber: data.phoneNumber,
        description: data.description,
      };
    },
    async getUserPagination(params: Record<string, any>) {
      const common = useCommonStore();
      common.setIsLoading(true);

      const result = await userController().getUsers(params);

      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.success = result.data?.success;
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
          this.meta = result.data?.meta;
        }
      }
      common.setIsLoading(false);
    },
    async getUserById(
      userId: string,
    ): Promise<TUserFullInformation | undefined> {
      const common = useCommonStore();
      const result = await userController().getUserById(userId);
      if (result.data) {
        this.error = result.data.error;
        this.userUpdate.username = result.data.result.username;
        this.userUpdate.fullName = result.data.result.fullName;
        this.userUpdate.description = result.data.result.description;
        this.userUpdate.emailAddress = result.data.result.emailAddress;
        this.userUpdate.siteId = result.data.result.site.id;
        this.userUpdate.phoneNumber = result.data.result.phoneNumber;
        this.userUpdate.roles = result.data.result.roles.map(
          (userRoles: { role: { id: string } }) => userRoles.role.id,
        );

        this.dataDetails = result.data.result;
        this.message = result.data.message;
        this.meta = result.data.meta;
        this.success = result.data.success;
      }
      common.setIsLoading(false);

      if (result.data?.error) {
        message.error(`${this.error.message}`);
      }

      return this.dataDetails;
    },
    async createUser(value: ICreateUser) {
      const common = useCommonStore();
      const result = await userController().createUser(value);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data.push(this.transformToTableData(result.data?.result));
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
      common.setIsModalShow(false);
      common.setIsLoadingButton(false);
    },
    async updateUserById(id: string, values: IUpdateUser) {
      const common = useCommonStore();
      const result = await userController().updateUserById(id, values);
      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          const index = this.data.findIndex(
            (x) => x.id === result.data?.result.id,
          );
          this.data[index] = this.transformToTableData(result.data?.result);
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
      common.setIsDrawerShow(false);
      common.setIsLoadingButton(false);
    },
    async deleteUserById(userId: string) {
      const result = await userController().deleteUserById(userId);

      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = this.data.filter((x) => {
            return x.id != userId;
          });
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
  },
});
