import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MotelService } from './motel.service';
import { CreateMotelDTO, UpdateMotelDTO } from './dtos';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/common/uploadfile';
import { PublicDecorator } from 'src/common/decorators/PublicDecorator';
import { Host } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { User } from 'src/common/decorators/User';
import { userInfo } from 'os';

@Controller('motel')
export class MotelController {
  constructor(private readonly motelService: MotelService) {}

  @Get('restore/:idMotel')
  @Host()
  @UseGuards(RoleGuard)
  restore(@User() user, @Param('idMotel', ParseIntPipe) idMotel: number) {
    return this.motelService.restoreMotel(user, idMotel);
  }
  @Get('restore')
  @Host()
  @UseGuards(RoleGuard)
  restoreAll(@User() user) {
    return this.motelService.restoreAllMotel(user);
  }

  @Get('myMotelsDeleted')
  getMotelDeleted(@User() userInfo) {
    return this.motelService.myMotelDeleted(userInfo);
  }

  @Post()
  @Host()
  @UseGuards(RoleGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage,
    }),
  )
  createMotel(
    @Body() body: CreateMotelDTO,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @User() user,
  ) {
    if (images) {
      body.images = images.map((image) => image.filename);
    }
    return this.motelService.createMotel(body, user.id);
  }
  @Get('myMotels')
  @Host()
  @UseGuards(RoleGuard)
  myMotels(@User() user) {
    return this.motelService.myMotels(user);
  }

  @Get('topSelling')
  @PublicDecorator()
  getTopSelling() {
    return this.motelService.getTopSelling();
  }

  @Get('topDiscount')
  @PublicDecorator()
  getTopDiscount() {
    return this.motelService.getTopDiscount();
  }

  @PublicDecorator()
  @Get()
  getMotels(@Query() query) {
    return this.motelService.getMotels(query);
  }

  @Get(':idMotel')
  @PublicDecorator()
  getMotel(@Param('idMotel', ParseIntPipe) idMotel: number) {
    return this.motelService.getMotel(idMotel);
  }

  @Put(':idMotel')
  @Host()
  @UseGuards(RoleGuard)
  updateMotel(
    @Param('idMotel', ParseIntPipe) idMotel: number,
    @Body() body: UpdateMotelDTO,
  ) {
    return this.motelService.updateMotel(idMotel, body);
  }

  @Delete(':idMotel')
  @Host()
  @UseGuards(RoleGuard)
  deleteMotel(@Param('idMotel', ParseIntPipe) idMotel: number) {
    return this.motelService.deleteMotel(idMotel);
  }

  @Delete('forceDeleteMotel/:idMotel')
  @Host()
  @UseGuards(RoleGuard)
  forceDeleteModule(@Param('idMotel', ParseIntPipe) idMotel: number) {
    return this.motelService.forceDeleteMotel(idMotel);
  }
}
