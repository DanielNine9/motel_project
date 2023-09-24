import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTPayload, LoginType, RegisterType } from './types';
import { typeUser } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { ResponseCommon } from 'src/common/dtos';
import { ResponseAuth } from './dtos';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  private readonly REFRESH_TOKEN = this.configService.get('REFRESH_TOKEN');
  private readonly ACCESS_TOKEN = this.configService.get('ACCESS_TOKEN');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async getToken(
    payload: JWTPayload,
    secret: string,
    expiresIn?: number,
  ) {
    const options =
      expiresIn !== undefined ? { secret, expiresIn } : { secret };
    return this.jwtService.sign(payload, { secret });
  }

  async login(body: LoginType, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      throw new ConflictException('Email is not correct');
    }

    const password = await argon2.verify(user.password, body.password);

    if (!password) {
      throw new ForbiddenException('Email or password is not correct');
    }
    const payload: JWTPayload = {
      id: user.id,
      role: user.role,
    };

    const accessTokenPromise: Promise<string> = this.getToken(
      payload,
      this.ACCESS_TOKEN,
      3600,
    );
    const refreshTokenPromise: Promise<string> = this.getToken(
      payload,
      this.REFRESH_TOKEN,
    );
    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    res.cookie('refresh_token', refreshToken, {
      // httpOnly: true,
      // maxAge: 36000,
    });
    return new ResponseCommon(new ResponseAuth({ ...user, accessToken }), 200);
  }

  async register(body: RegisterType) {
    const exists = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (exists) {
      throw new ConflictException('Email has been taken');
    }
    const password = await argon2.hash(body.password);

    const newUser = await this.prismaService.user.create({
      data: {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        email: body.email,
        contact: body.contact,
        password,
        role: typeUser.RENTER,
        imageURL: body.imageURL,
        banned: false,
      },
    });

    return new ResponseCommon(newUser, 201);
  }

  async me(payload: JWTPayload) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new ForbiddenException('Forbidden');
    }
    delete user.password;
    delete user.refreshToken;
    delete user.hostId;
    return new ResponseCommon(user, 200);
  }

  async refreshToken(req: Request, res: Response) {
    const cookie = req?.cookies['refresh_token'];
    if (!cookie) {
      throw new ForbiddenException('You are not refresh token');
    }
    const verify = await this.jwtService.verify(cookie, {
      secret: this.REFRESH_TOKEN,
    });

    if (!verify) {
      throw new ForbiddenException('Refresh token is not correct');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        id: verify.id,
      },
    });

    if (!user || user.refreshToken !== cookie) {
      throw new ForbiddenException('You are not the right');
    }

    const payload: JWTPayload = {
      id: user.id,
      role: user.role,
    };

    const refreshTokenPromise: Promise<string> = this.getToken(
      payload,
      this.REFRESH_TOKEN,
    );
    const accessTokenPromise: Promise<string> = this.getToken(
      payload,
      this.ACCESS_TOKEN,
      3600,
    );
    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    res.cookie('refresh_token', refreshToken, {
      // httpOnly: true,
    });

    return new ResponseCommon({ accessToken }, 200);
  }

  async logout(payload: JWTPayload, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new ForbiddenException('You are not the right');
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: Math.random() + Math.random().toString(),
      },
    });

    res.cookie('refresh_token', '', { maxAge: 0 });
    return new ResponseCommon('successfully', 200);
  }
}
