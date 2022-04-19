import { ITopic } from "./topic";

export interface IDevice {
  id: string,
  deviceTypeId: string,
  name: string,
  description: string,
  isActive: boolean,
  createdAt?: string,
  updatedAt?: string,
  topics?: ITopic[]
}