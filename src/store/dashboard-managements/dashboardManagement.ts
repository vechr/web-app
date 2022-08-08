import { defineStore } from "pinia"
import { IDashboard, IError } from "@/types/index"
import axios from "axios"
import { message } from "ant-design-vue"
import { useCommonStore } from "@/store"

interface IDashboardData {
  message: string
  dataFull: IDashboard[]
  data: IDashboard[]
  dashboardEdit: { name: string; description: string; devices: string[] }
  dataDetails: IDashboard
  error: IError
}

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_THINGS
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.post["Accept"] = "application/json"

export const useDashboardManagementStore = defineStore("dashboardManagement", {
  state: () => {
    return {
      message: "",
      dataFull: [],
      data: [],
      dashboardEdit: { name: "", description: "", devices: [] },
      dataDetails: {
        id: "",
        name: "",
        description: "",
        createdAt: "",
        updatedAt: "",
        devices: [],
      },
      error: {
        code: "",
        message: "",
        params: Object,
      },
    } as IDashboardData
  },
  getters: {
    dashboardColumns() {
      return [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Devices",
          dataIndex: "devices",
          key: "devices",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Updated At",
          dataIndex: "updatedAt",
          key: "updatedAt",
        },
        {
          title: "Action",
          dataIndex: "id",
          key: "action",
        },
      ]
    },
    dashboardList(state) {
      return state.data.map((dashboard) => ({
        id: dashboard.id,
        name: dashboard.name,
        description: dashboard.description,
        createdAt:
          dashboard.createdAt !== undefined
            ? new Date(dashboard.createdAt).toLocaleString("en-US")
            : dashboard.createdAt,
        updatedAt:
          dashboard.updatedAt !== undefined
            ? new Date(dashboard.updatedAt).toLocaleString("en-US")
            : dashboard.updatedAt,
        devices: dashboard.devices?.map((device) => device.name),
      }))
    },
  },
  actions: {
    async getDashboardFullList() {
      const common = useCommonStore()
      common.setIsLoading(true)
      await axios
        .get("/dashboard/details")
        .then((res) => {
          common.setIsLoading(false)
          if (res.status === 200) {
            this.message = res.data.message
            this.dataFull = res.data.result
            this.error = res.data.error
          }
        })
        .catch((err) => {
          common.setIsLoading(false)
          this.error = err.response.data.error
          message.error(`${this.error.code} ${this.error.message}`)
        })
    },
    async getDashboardList() {
      const common = useCommonStore()
      common.setIsLoading(true)
      await axios
        .get("/dashboard")
        .then((res) => {
          common.setIsLoading(false)
          if (res.status === 200) {
            this.message = res.data.message
            this.data = res.data.result
            this.error = res.data.error
          }
        })
        .catch((err) => {
          common.setIsLoading(false)
          this.error = err.response.data.error
          message.error(`${this.error.code} ${this.error.message}`)
        })
    },
    async getDashboardById(id: string) {
      await axios
        .get(`/dashboard/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message
            ;(this.dashboardEdit.name = res.data.result.name),
              (this.dashboardEdit.description = res.data.result.description),
              (this.dashboardEdit.devices = res.data.result.devices?.map(
                (device: { id: string }) => device.id
              ))
            this.dataDetails = res.data.result
            this.error = res.data.error
          }
        })
        .catch((err) => {
          this.error = err.response.data.error
          message.error(`${this.error.code} ${this.error.message}`)
        })
    },
    async createDashboard(value: { name: string; description: string }) {
      const common = useCommonStore()
      await axios
        .post("/dashboard", value)
        .then((res) => {
          common.setIsModalShow(false)
          common.setIsLoadingButton(false)
          if (res.status === 201) {
            this.message = res.data.message
            this.data.push(res.data.result)
            this.error = res.data.error
            message.success(`${res.status} ${this.message}`)
          }
        })
        .catch((err) => {
          common.setIsModalShow(false)
          common.setIsLoadingButton(false)
          this.error = err.response.data.error
          message.error(`${this.error.code} ${this.error.message}`)
        })
    },
    async updateDashboardById(
      id: string,
      value: { name: string; description: string; devices: string[] }
    ) {
      const common = useCommonStore()
      await axios
        .patch(`/dashboard/${id}`, value)
        .then((res) => {
          common.setIsDrawerShow(false)
          common.setIsLoadingButton(false)
          if (res.status === 200) {
            this.message = res.data.message
            const index = this.data.findIndex(
              (x) => x.id === res.data.result.id
            )
            this.data[index] = res.data.result
            this.error = res.data.error
            message.success(`${res.status} ${this.message}`)
          }
        })
        .catch((err) => {
          common.setIsDrawerShow(false)
          common.setIsLoadingButton(false)
          this.error = err.response.data.error
          message.error(`${this.error.code} ${this.error.message}`)
        })
    },
    async deleteDashboardById(id: string) {
      await axios
        .delete(`/dashboard/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.message = res.data.message
            this.data = this.data.filter((x) => {
              return x.id != id
            })
            this.error = res.data.error
            message.success(`${res.status} ${this.message}`)
          }
        })
        .catch((err) => {
          this.error = err.response.data.error
          message.error(`${this.error.code} ${this.error.message}`)
        })
    },
  },
})
