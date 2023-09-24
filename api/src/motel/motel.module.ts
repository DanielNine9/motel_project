import { Module } from '@nestjs/common';
import { MotelController } from './motel.controller';
import { MotelService } from './motel.service';

@Module({
  controllers: [MotelController],
  providers: [MotelService]
})
export class MotelModule {}
