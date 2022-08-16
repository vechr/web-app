export interface IError {
  code: string,
  message: string,
  params: Record<string, any>
}