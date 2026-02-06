import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@ZKLib/database';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(code: string) {
    // 1. Verify code with QQ API (Mock for now)
    const qqUser = await this.verifyQQCode(code);
    if (!qqUser) {
      throw new UnauthorizedException('Invalid QQ code');
    }

    // 2. Find or create user
    let user = await this.prisma.client.user.findUnique({
      where: { qq_openid: qqUser.openid },
    });

    if (!user) {
      user = await this.prisma.client.user.create({
        data: {
          qq_openid: qqUser.openid,
          name: qqUser.nickname || `User_${qqUser.openid.slice(-4)}`,
          role: 'student', // Default role
        },
      });
    }

    // 3. Generate JWT
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        qq_openid: user.qq_openid,
      },
    };
  }

  // Mock QQ API verification
  private async verifyQQCode(code: string): Promise<{ openid: string; nickname?: string } | null> {
    if (code === 'test_code_student') {
      return { openid: 'OPENID_STUDENT_001', nickname: 'Test Student' };
    }
    if (code === 'test_code_teacher') {
      return { openid: 'OPENID_TEACHER_001', nickname: 'Test Teacher' };
    }
    // In production, implement real HTTP call to QQ API
    return null;
  }
}
