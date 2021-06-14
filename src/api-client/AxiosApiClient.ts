import { AxiosError, AxiosInstance, Method } from "axios";
import RequestError from "../error/RequestError";
import Nullable from "../types/Nullable";
import Result from "../types/Result";
import ApiClient from "./ApiClient";


export class AxiosApiClient implements ApiClient {
    constructor(public axiosInstance: AxiosInstance) {}

    async post<B, T>(path: string, body: B, headers?: Record<string, string>): Promise<Result<T>> {
        return this.request('POST', path, body, headers)
    }
    async get<T>(path: string, headers?: Record<string, string>): Promise<Result<T>> {
        return this.request('GET', path, null, headers)
    }
    async put<B, T>(path: string, body: B, headers?: Record<string, string>): Promise<Result<T>> {
        return this.request('PUT', path, body, headers)
    }
    async patch<B, T>(path: string, body: B, headers?: Record<string, string>): Promise<Result<T>> {
        return this.request('PATCH', path, body, headers)
    }
    async delete<T>(path: string, headers?: Record<string, string>): Promise<Result<T>> {
        return this.request('DELETE', path, null, headers)
    }

    async request<B, T>(method: Method ,path: string, body: Nullable<B>, headers: Nullable<Record<string, string>>): Promise<Result<T>>{
        try {
            const response = await this.axiosInstance.request<T>({url: path, method, data: body, headers })
            return Result.ok<T>(response.data)
        } catch (e) {
            const error: AxiosError = e
            const requestError = new RequestError(path, method, body, error.response?.status || 500, error.response?.data)
            return Result.fail<T>(requestError)
        }
    }
}