import { defineStore } from "pinia";
import { IDashboard, IError } from '@/types/index'
import axios from "axios";
import { message } from 'ant-design-vue';
import { useCommonStore } from "./common";

interface IDashboardData {
  message: string,
  data: IDashboard[],
  dataDetails: IDashboard,
  error: IError
}

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

export const useDashboardManagementStore = defineStore('dashboardManagement', {
  state: () => {
    return {
      message: "",
      data: [],
      dataDetails: {
        id: "",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        devices: []
      },
      error: {
        code: "",
        message: "",
        params: Object
      }
    } as IDashboardData
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
          key: 'action'
        }
      ]
    },
    dashboardList(state) {
      return (
        state.data.map((dashboard) => ({ id: dashboard.id, name: dashboard.name, description: dashboard.description, createdAt: new Date(dashboard.createdAt).toLocaleString('en-US'), updatedAt: new Date(dashboard.updatedAt).toLocaleString('en-US') }))
      );
    },
    deviceList(state) {
      return (
        state.data.map((dashboard) => dashboard.devices)
      );
    }
  },
  actions: {
    async getDashboardList() {
      const common = useCommonStore();
      common.setIsLoading(true);
      await axios.get(`http://localhost:3003/dashboard`)
        .then((res) => {
          common.setIsLoading(false);
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = res.data.result;
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          common.setIsLoading(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async getDashboardById(id: string) {
      const common = useCommonStore();
      await axios.get(`http://localhost:3003/dashboard/${id}`)
        .then((res) => {
          common.setIsLoading(false);
          if (res.status === 200) {
            this.message = res.data.message;
            this.dataDetails = res.data.result;
            this.error = res.data.error;
          }
        })
        .catch((err) => {
          common.setIsLoading(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async createDashboard(value: { name: string, description: string }) {
      const common = useCommonStore();
      await axios.post(`http://localhost:3003/dashboard`, value)
        .then((res) => {
          common.setIsModalShow(false);
          common.setIsLoadingButton(false);
          if (res.status === 201) {
            this.message = res.data.message;
            this.data.push(res.data.result);
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          common.setIsModalShow(false);
          common.setIsLoadingButton(false);
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async deleteDashboardById(id: string) {
      await axios.delete(`http://localhost:3003/dashboard/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message;
            this.data = this.data.filter(x => { return x.id != id })
            this.error = res.data.error;
            message.success(`${res.status} ${this.message}`);
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    }
  }
})