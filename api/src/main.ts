import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Đảm bảo rằng middleware serving static files từ thư mục public được áp dụng đúng trước các middleware khác.
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.enableCors();
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:8080',
  //     'http://example.com',
  //     'http://www.example.com',
  //     'http://app.example.com',
  //     'https://example.com',
  //     'https://www.example.com',
  //     'https://app.example.com',
  //     'https://app.example.com',
  //   ],
  //   methods: ['GET', 'POST'],
  //   credentials: true,
  // });
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
