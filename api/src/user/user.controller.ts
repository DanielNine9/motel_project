import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { PublicDecorator } from 'src/common/decorators/PublicDecorator';
import { Admin } from 'src/common/decorators/role.decorator';
import { UserUpdateDTO } from './dtos';
import { User } from 'src/common/decorators/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Admin()
  getUsers(@Query() query) {
    return this.userService.getUsers(query);
  }

  @Get('/:userId')
  @UseGuards(RoleGuard)
  @Admin()
  getUser(@Param('userId', ParseIntPipe) param) {
    return this.userService.getUser(param);
  }

  @Get('/userGlobal/:userId')
  @UseGuards(RoleGuard)
  @PublicDecorator()
  getUserGlobal(@Param('userId', ParseIntPipe) param) {
    return this.userService.getUserGlobal(param);
  }

  @Delete('/:userId')
  @UseGuards(RoleGuard)
  @Admin()
  deleteUser(@Param('userId', ParseIntPipe) param) {
    return this.userService.deleteUser(param);
  }

  @Put('/:userId')
  @UseGuards(RoleGuard)
  @Admin()
  updateUser(
    @Param('userId', ParseIntPipe) param,
    @Body() body: UserUpdateDTO,
    @User() user,
  ) {
    return this.userService.updateUser(param, body, user);
  }
}
