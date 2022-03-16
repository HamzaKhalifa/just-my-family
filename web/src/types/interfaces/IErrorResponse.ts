import { IHttpResponse } from './IHttpResponse'

export interface IErrorResponse<T> {
  response: IHttpResponse<T>
}
