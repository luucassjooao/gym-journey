import {UserType} from '../../utils/types/User';
import HttpClient from '../utils/HttpClient';

class AuthService {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async signin(email: string, password: string): Promise<UserType> {
    return this.httpClient.post('/auth/signin', {email, password});
  }

  async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<UserType> {
    return this.httpClient.post('/auth/signup', {name, email, password});
  }
}

export default new AuthService();
