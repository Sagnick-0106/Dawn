import axios from 'axios';
import { getToken } from './user';

export default class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  addHeaders(request, headers) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers = {
      ...request.headers,
      ...headers
    };
  }
  async makeRequest(request) {
    request.baseURL = this.baseURL;
    const response = await axios.request(request);
    return response.data;
  }

  async makeAuthenticatedRequest(request) {
    const token = getToken();
    this.addHeaders(request, { authorization: `Bearer ${token}` });
    const response = await this.makeRequest(request);
    return response;
  }
}
