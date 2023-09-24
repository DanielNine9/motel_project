import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWTPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTPasspord extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpires: false,
      secretOrKey: configService.get('ACCESS_TOKEN'),
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        role: true,
        id: true,
        address: true,
        banned: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access token is not correct');
    }
    if (user.banned) {
      throw new ForbiddenException('Account is banned');
    }
    return payload;
  }
}
