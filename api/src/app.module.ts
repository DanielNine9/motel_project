import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MotelModule } from './motel/motel.module';
import { RentModule } from './rent/rent.module';
import { ATGuard } from './common/guards/atGuard';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, MotelModule, RentModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ATGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
