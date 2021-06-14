import { AxiosApiClient } from '../../src'

const axios = jest.genMockFromModule<any>('axios');

axios.create.mockReturnThis();

const exampleResponse = { something: true }

type ExampleResponse = { something: boolean }

const axiosInstance = axios.create({
    baseURL: 'https://test.test.com.test/v1',
    headers: {
        Authorization: 'Bearer xx1'
    }
})
const apiClient = new AxiosApiClient(axiosInstance)

describe('Api Client: AxiosApiClient.ts', () => {
  it('get: should return result if request is succesful', async () => {  
    axios.request.mockResolvedValueOnce({ data: exampleResponse });
    const result = await apiClient.get<ExampleResponse>('something')
    expect(result.isSuccess).toEqual(true)
    expect(result.isFailure).toEqual(false)
    expect(result.getValue()).toEqual(exampleResponse)
  });
  
  it('get: should return failed Result if request fail', async () => {  
    axios.request.mockRejectedValueOnce({ response: { data: exampleResponse, status: 400 } });
    const result = await apiClient.get<ExampleResponse>('something')
    expect(result.isFailure).toEqual(true)
    expect(result.isSuccess).toEqual(false)
    expect((result.error?.toJSON() as any).statusCode).toEqual(400)
    expect((result.error?.toJSON() as any).statusCode).toEqual(400)
    expect((result.error?.toJSON() as any).requestUrl).toEqual('something')
    expect((result.error?.toJSON() as any).requestBody).toBeNull()
    expect((result.error?.toJSON() as any).responseData).toEqual(exampleResponse)
  });
});
