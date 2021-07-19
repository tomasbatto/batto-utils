import Nullable from '../types/Nullable'
import IError from './IError'

export default class RequestError implements IError {
  constructor(
    public url: string,
    public method: string,
    public body: Nullable<Record<string, any>>,
    public statusCode: string | number,
    public responseBody: Record<string, any> | string
  ) {}
  toJSON(): Record<string, any> {
    return {
      requestUrl: this.url,
      requestMethod: this.method,
      requestBody: this.body || null,
      statusCode: this.statusCode,
      responseData: this.responseBody,
    }
  }
  toString(): string {
    return `[Request Error | ${this.method} ${this.url}] Status Code: ${
      this.statusCode
    } - Response: ${JSON.stringify(this.responseBody)}`
  }
}
