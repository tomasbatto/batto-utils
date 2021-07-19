import { Result } from "../types";

export default interface ApiClient {
    post<B, T>(path: string, body: B, headers?: Record<string, string>): Promise<Result<T>>
    get<T>(path: string, headers?: Record<string, string>): Promise<Result<T>>
    put<B, T>(path: string, body: B, headers?: Record<string, string>): Promise<Result<T>>
    patch<B, T>(path: string, body: B, headers?: Record<string, string>): Promise<Result<T>>
    delete<T>(path: string, headers?: Record<string, string>): Promise<Result<T>>
}