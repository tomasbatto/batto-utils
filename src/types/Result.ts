import IError from '../error/IError'
import Nullable from './Nullable'

export default class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error: Nullable<IError>
  private _value: Nullable<T>

  private constructor(isSuccess: boolean, error?: Nullable<IError>, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
          successful and contain an error`)
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
          needs to contain an error message`)
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this._value = value || null

    Object.freeze(this)
  }

  public getValue(): Nullable<T> {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`)
    }

    return this._value
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  public static fail<U>(error: IError): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure) return result
    }
    return Result.ok<any>()
  }
}
