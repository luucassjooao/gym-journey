import HttpClient from '../HttpClient';

class AuthService {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async signin(email: string, password: string) {
    return this.httpClient.post('/auth/signin', {email, password});
  }

  async signup(name: string, email: string, password: string) {
    return this.httpClient.post('/auth/signup', {name, email, password});
  }
}

export default new AuthService();
