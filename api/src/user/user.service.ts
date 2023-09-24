import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUser, UserResponse, UserResponseGlobal } from './dtos';
import { typeUser } from '@prisma/client';
import { contains } from 'class-validator';
import { ResponseCommon } from 'src/common/dtos';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  private itemsPerPage = 10;
  async getTotal() {
    const totalItems = await this.prismaService.user.count();
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return [totalItems, totalPages];
  }

  async getUsers(query): Promise<ResponseCommon> {
    const pageNumber = query.pageNumber ? query.pageNumber : 1;
    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);
    const skip = (pageNumber - 1) * 20;
    const where: any = { AND: [] };

    if (query.name) {
      where.AND.push(
        { username: { contains: query.name } },
        { firstName: { contains: query.name } },
        { lastName: { contains: query.name } },
      );
    }

    if (query.address) {
      where.AND.push({ address: { contains: query.address } });
    }

    if (where.AND.length === 0) {
      delete where.AND;
    }

    const users = await this.prismaService.user.findMany({
      ...where,
      skip,
      take: this.itemsPerPage,
    });

    const [totalItems, totalPages] = await this.getTotal();

    return new ResponseCommon(
      new ResponseUser(
        users.map((user) => new UserResponse(user)),
        totalItems,
        totalPages,
      ),
      200,
    );
  }

  async getUser(param: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: param,
      },
    });
    if (!user) throw new NotFoundException('User do not found');
    return new ResponseCommon(new UserResponse(user), 200);
  }

  async updateUser(param: number, data, user): Promise<ResponseCommon> {
    const userUpdate = await this.prismaService.user.findUnique({
      where: {
        id: param,
      },
    });
    if (user.id !== userUpdate.id && user.role !== typeUser.ADMIN) {
      throw new ForbiddenException('You are not the right');
    }

    if (user.id !== userUpdate.id) {
      delete data.username;
      delete data.address;
      delete data.image;
    }

    return new ResponseCommon(
      new UserResponse(
        await this.prismaService.user.update({
          where: {
            id: param,
          },
          data,
        }),
      ),
      200,
    );
  }

  async deleteUser(param: number): Promise<ResponseCommon> {
    await this.prismaService.user.update({
      where: {
        id: param,
      },
      data: {
        banned: true,
      },
    });
    return new ResponseCommon('successfully', 200);
  }

  async getUserGlobal(userId: number): Promise<ResponseCommon> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return new ResponseCommon(new UserResponseGlobal(user), 200);
  }
}
