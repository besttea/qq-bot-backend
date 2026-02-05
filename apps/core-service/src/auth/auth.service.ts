import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(code: string) {
    return { accessToken: 'dummy_token', user: { id: '1', name: 'Test User' } };
  }
}
