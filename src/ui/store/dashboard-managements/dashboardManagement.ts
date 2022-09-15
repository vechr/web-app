import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { useCommonStore } from '@/ui/store';
import { IDashboardData } from '@/domain';
import { dashboardController } from '@/applications/controllers';

export const useDashboardManagementStore = defineStore('dashboardManagement', {
  state: () => {
    return {
      message: '',
      dataFull: [],
      data: [],
      dashboardEdit: { name: '', description: '', devices: [] },
      dataDetails: {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        devices: [],
      },
      error: {
        code: '',
        message: '',
        params: Object,
      },
    } as IDashboardData;
  },
  getters: {
    dashboardColumns() {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Devices',
          dataIndex: 'devices',
          key: 'devices',
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: 'Action',
          dataIndex: 'id',
          key: 'action',
        },
      ];
    },
    dashboardList(state) {
      return state.data.map((dashboard) => ({
        id: dashboard.id,
        name: dashboard.name,
        description: dashboard.description,
        createdAt:
          dashboard.createdAt !== undefined
            ? new Date(dashboard.createdAt).toLocaleString('en-US')
            : dashboard.createdAt,
        updatedAt:
          dashboard.updatedAt !== undefined
            ? new Date(dashboard.updatedAt).toLocaleString('en-US')
            : dashboard.updatedAt,
        devices: dashboard.devices?.map((device) => device.name),
      }));
    },
  },
  actions: {
    async getDashboardFullList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await dashboardController().getDashboardFullList();
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.dataFull = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async getDashboardList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      const result = await dashboardController().getDashboardList();
      if (result.data?.error) {
        common.setIsLoading(false);
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsLoading(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async getDashboardById(id: string) {
      const result = await dashboardController().getDashboardById(id);
      if (result.data?.error) {
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          (this.dashboardEdit.name = result.data?.result.name),
            (this.dashboardEdit.description = result.data?.result.description),
            (this.dashboardEdit.devices = result.data?.result.devices?.map(
              (device: { id: string }) => device.id,
            ));
          this.dataDetails = result.data?.result;
          this.error = result.data?.error;
        }
      }
    },
    async createDashboard(value: { name: string; description: string }) {
      const common = useCommonStore();
      const result = await dashboardController().createDashboard(value);
      if (result.data?.error) {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsModalShow(false);
        common.setIsLoadingButton(false);
        if (result.status === 201) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data.push(result.data?.result);
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async updateDashboardById(
      id: string,
      value: { name: string; description: string; devices: string[] },
    ) {
      const common = useCommonStore();
      const result = await dashboardController().updateDashboardById(id, value);
      if (result.data?.error) {
        common.setIsDrawerShow(false);
        common.setIsLoadingButton(false);
        this.error = result.data?.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        common.setIsDrawerShow(false);
        common.setIsLoadingButton(false);
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          const index = this.data.findIndex(
            (x) => x.id === result.data?.result.id,
          );
          this.data[index] = result.data?.result;
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
    async deleteDashboardById(id: string) {
      const result = await dashboardController().deleteDashboardById(id);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        if (result.status === 200) {
          this.message = result.data ? result.data.message : 'Success!';
          this.data = this.data.filter((x) => {
            return x.id != id;
          });
          this.error = result.data?.error;
          message.success(`${result.status} ${this.message}`);
        }
      }
    },
  },
});
