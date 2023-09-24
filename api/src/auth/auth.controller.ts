import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dtos';
import { Response, Request } from 'express';
import { Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/User';
import { JWTPayload } from './types';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '../common/uploadfile';
import { PublicDecorator } from 'src/common/decorators/PublicDecorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @PublicDecorator()
  login(@Body() body: LoginDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(body, res);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @PublicDecorator()
  async register(@Body() body: RegisterDTO, @UploadedFile() file) {
    body.imageURL = file ? file.filename : 'avatar_empty.jpg';
    return this.authService.register(body);
  }

  @Get('me')
  me(@User() user: JWTPayload) {
    return this.authService.me(user);
  }

  @Get('refreshToken')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post('logout')
  logout(
    @User() payload: JWTPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(payload, res);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async upload(@UploadedFile() file) {
    return file.path;
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage,
    }),
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files;
  }
}
