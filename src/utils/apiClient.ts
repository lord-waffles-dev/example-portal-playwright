import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  private context: APIRequestContext;
  private authToken?: string;

  constructor(context: APIRequestContext) {
    this.context = context;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  async get(endpoint: string, params = {}) {
    return this.context.get(`${endpoint}`, { params });
  }

  async post<T>(endpoint: string, data: T, timeout = 60000) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    return this.context.post(`${endpoint}`, {
      data,
      headers,
      timeout
    });
  }

  async put<T>(endpoint: string, data: T) {
    return this.context.put(`${endpoint}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${process.env.TOKEN}'
      }
    });
  }

  async delete(endpoint: string) {
    return this.context.delete(`${endpoint}`);
  }
}
