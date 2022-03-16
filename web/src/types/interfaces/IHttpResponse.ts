export interface IResponseData<T> {
  data: T
  success: boolean
  responseType: string
  messages: string[]
}

export interface IHttpResponse<T> {
  data: IResponseData<T>
}
