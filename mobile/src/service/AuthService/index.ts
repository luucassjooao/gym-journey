import HttpClient from '../HttpClient';

class AuthService {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async login(email: string, password: string) {
    return this.httpClient.post('/auth/signin', {email, password});
  }
}

export default new AuthService();
