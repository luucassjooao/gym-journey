import {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

import APIError from '../../errors/APIErrors';

import api from './api';

class HttpClient {
  private baseURL;

  constructor(baseURL = 'http://10.0.2.2:3000') {
    this.baseURL = baseURL;
  }

  get<T>(path: string, headers?: RawAxiosRequestHeaders | AxiosHeaders) {
    return this.makeRequest<T>({
      method: 'get',
      url: `${this.baseURL}${path}`,
      headers,
    });
  }

  delete<T>(path: string) {
    return this.makeRequest<T>({
      method: 'delete',
      url: `${this.baseURL}${path}`,
    });
  }

  post<T>(path: string, data: unknown) {
    return this.makeRequest<T>({
      method: 'post',
      url: `${this.baseURL}${path}`,
      data,
    });
  }

  patch<T>(path: string, data: unknown) {
    return this.makeRequest<T>({
      method: 'patch',
      url: `${this.baseURL}${path}`,
      data,
    });
  }

  async makeRequest<T>(
    options: AxiosRequestConfig,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
  ): Promise<T> {
    const response: AxiosResponse = await api({
      ...options,
      headers,
      validateStatus: function (status) {
        return status >= 200 && status <= 500;
      },
    });

    if (response.status >= 200 && response.status < 400) {
      return response.data as T;
    }

    throw new APIError(response);
  }
}

export default HttpClient;
