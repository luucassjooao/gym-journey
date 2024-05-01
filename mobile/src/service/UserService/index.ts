import {UserType} from '../../utils/types/User';
import HttpClient from '../utils/HttpClient';

class UserService {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getUserInfo(token: string): Promise<UserType> {
    return this.httpClient.get('/user/getUserInfo', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new UserService();
