import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '@ZKLib/database';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev_secret',
    });
  }

  async validate(payload: any) {
    // payload.sub is user.id
    const user = await this.prisma.client.user.findUnique({
      where: { id: payload.sub },
    });
    
    if (user) {
      // Exclude sensitive data if any
      return { id: user.id, role: user.role, qq_openid: user.qq_openid };
    }
    return null;
  }
}
