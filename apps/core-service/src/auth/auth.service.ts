import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@ZKLib/database';
import { QQUser } from '@ZKLib/qq-sdk';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService,
  ) {}

  async login(code: string) {
    const qqUser = await this.verifyQQCode(code);
    if (!qqUser) {
      throw new Error('Invalid QQ Code');
    }

    // Upsert user
    const user = await this.db.client.user.upsert({
      where: { qq_openid: qqUser.id },
      update: {},
      create: {
        qq_openid: qqUser.id,
        name: qqUser.username,
        role: 'student',
      },
    });

    return {
      accessToken: this.jwtService.sign({ sub: user.id, role: user.role }),
      user,
    };
  }

  // Mock implementation of QQ Login verification
  private async verifyQQCode(code: string): Promise<QQUser | null> {
    if (code === 'test_code_student') {
      return {
        id: 'OPENID_STUDENT_001',
        username: 'Test Student',
        avatar: '',
        bot: false,
      };
    }
    if (code === 'test_code_teacher') {
      return {
        id: 'OPENID_TEACHER_001',
        username: 'Test Teacher',
        avatar: '',
        bot: false,
      };
    }
    return null;
  }
}
