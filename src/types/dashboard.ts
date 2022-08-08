import { IDevice } from "./device"

export interface IDashboard {
  id: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
  devices?: IDevice[]
}
