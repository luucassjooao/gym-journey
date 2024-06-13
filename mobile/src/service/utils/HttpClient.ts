import APIError from '../../errors/APIErrors';

type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown;
  headers?: Record<string, string> | undefined;
};

class HttpClient {
  private baseURL;

  constructor(
    baseURL = 'https://bbc0-2804-5c-55a0-cc00-89e-3d3f-597e-a2.ngrok-free.app',
  ) {
    this.baseURL = baseURL;
  }

  get(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.makeRequest(path, {
      method: 'get',
      headers: options?.headers,
    });
  }

  delete(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.makeRequest(path, {
      method: 'delete',
      headers: options?.headers,
    });
  }

  post(path: string, options: RequestOptions) {
    return this.makeRequest(path, {
      method: 'post',
      body: options.body,
      headers: options?.headers,
    });
  }

  patch(path: string, options: RequestOptions) {
    return this.makeRequest(path, {
      method: 'patch',
      body: options.body,
      headers: options?.headers,
    });
  }

  put(path: string, options: RequestOptions) {
    return this.makeRequest(path, {
      method: 'put',
      body: options.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path: string, options: RequestOptions) {
    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }
    console.log(JSON.stringify(response, null, 2));
    console.log(JSON.stringify(responseBody, null, 2));

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
