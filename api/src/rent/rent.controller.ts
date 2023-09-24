import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { User } from 'src/common/decorators/User';
import { transactionDTO } from './dtos';
import { Host } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}
  @Post(':motelId')
  transaction(
    @User() user,
    @Body() body: transactionDTO,
    @Param('motelId', ParseIntPipe) motelId: number,
  ) {
    return this.rentService.transaction(user, motelId, body);
  }

  @Put('accept/:renterId')
  @Host()
  @UseGuards(RoleGuard)
  accept(@User() user, @Param('renterId', ParseIntPipe) renterId: number) {
    return this.rentService.accept(user, renterId);
  }

  @Get('cancelByRenter/:renterId')
  cancelByRenter(@User() userInfo, @Param('renterId') renterId: number) {
    return this.rentService.cancelTransactionSideRenter(userInfo, renterId);
  }

  @Host()
  @UseGuards(RoleGuard)
  @Get('cancelByHost/:renterId')
  cancelByHost(@User() userInfo, @Param('renterId') renterId: number) {
    return this.rentService.cancelTransactionSideHost(userInfo, renterId);
  }

  @Get('')
  myRent(@User() user) {
    return this.rentService.getRent(user);
  }

  @Get('waitAccept')
  myMotelIncomplete(@User() user) {
    return this.rentService.waitAccept(user);
  }

  @Get('total')
  getTotal(@User() user) {
    return this.rentService.getTotal(user);
  }

  getRent() {}
}
