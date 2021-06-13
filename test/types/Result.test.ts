import { IError, Result } from '../../src';

class ExampleError implements IError {
    toJSON(): Record<string, any> {
        return {something: true}
    }
    toString(): string {
        return 'Error'
    }
}

describe('Result.ts unit tests', () => {
  it('should return a succesful Result object with a value and no error', () => {
    const result = Result.ok<string>('Success!')
    expect(result.isFailure).toBeFalsy()
    expect(result.isSuccess).toBeTruthy()
    expect(result.getValue()).toBeDefined()
    expect(result.error).toBeNull()
    expect(result.getValue()).toEqual('Success!')
  });
  it('should return a succesful Result object with a value and no error', () => {
    const result = Result.fail<string>(new ExampleError())
    expect(result.isSuccess).toBeFalsy()
    expect(result.isFailure).toBeTruthy()
    expect(result.getValue).toThrowError()
    expect(result.error).toBeDefined()
    expect(result.error?.toString()).toEqual('Error')
  });
});
