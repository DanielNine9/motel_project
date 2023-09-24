import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ResponseCommon } from 'src/common/dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentService {
  constructor(private readonly prismaService: PrismaService) {}

  async transaction(user, idMotel: number, body) {
    const motel = await this.prismaService.motel.findUnique({
      where: {
        id: idMotel,
      },
    });
    if (!motel) {
      throw new NotFoundException('Motel do not found');
    }

    if (motel.booked === motel.quantity) {
      throw new ForbiddenException('The motel is out of rooms');
    }

    if (motel.booked >= motel.quantity) {
      throw new ForbiddenException('The motel is out of rooms');
    }

    if (motel.booked + body.quantity > motel.quantity) {
      throw new ForbiddenException(
        'Your reservation quantity exceeds the room limit',
      );
    }

    const rentExists = await this.prismaService.rent.findFirst({
      where: {
        idMotel: motel.id,
        idRenter: user.id,
      },
      include: {
        Motel: true,
      },
    });

    if (rentExists) {
      if (rentExists.completed) {
        throw new ForbiddenException(
          'You are in the process of renting of room',
        );
      }

      return await this.prismaService.rent.update({
        where: {
          id: rentExists.id,
        },
        data: {
          ...body,
        },
      });
    }

    const rent = await this.prismaService.rent.create({
      data: {
        ...body,
        Motel: {
          connect: {
            id: motel.id,
          },
        },
        Renter: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return new ResponseCommon(rent, 200);
  }

  async getRent(user) {
    const myRent = await this.prismaService.rent.findMany({
      where: {
        idRenter: user.id,
      },
    });
    return new ResponseCommon(myRent, 200);
  }

  async getTotal(user: any) {
    const rents = await this.prismaService.rent.findMany({
      where: {
        idRenter: user.id,
      },
      include: {
        Motel: true,
      },
    });
    const totalRent = rents.reduce((acc, rent) => {
      return acc + rent.Motel.price * rent.quantity;
    }, 0);

    return new ResponseCommon(totalRent, 200);
  }

  async getMyMotel(user) {
    const myMotel = await this.prismaService.rent.findMany({
      where: {
        completed: false,
        Motel: {
          idUser: user.id,
        },
      },
    });
    return new ResponseCommon(myMotel, 200);
  }

  async waitAccept(user: any) {
    const myMotel = await this.prismaService.rent.findMany({
      where: {
        completed: false,
        Motel: {
          idUser: user.id,
        },
      },
    });
    return new ResponseCommon(myMotel, 200);
  }

  async accept(user, rentId) {
    const myMotel = await this.prismaService.rent.findFirst({
      where: {
        id: rentId,
        completed: false,
        Motel: {
          idUser: user.id,
        },
      },
      include: {
        Motel: true,
      },
    });
    if (!myMotel) {
      throw new NotFoundException('The motel do not found');
    }

    if (myMotel.Motel.idUser !== user.id) {
      throw new ForbiddenException('You are not the right');
    }

    const handlePromise: Promise<any>[] = [];

    const updateMotel = this.prismaService.motel.update({
      where: {
        id: myMotel.Motel.id,
      },
      data: {
        booked: myMotel.Motel.booked + 1,
      },
    });
    const accept = this.prismaService.rent.update({
      where: {
        id: myMotel.id,
      },
      data: {
        completed: true,
      },
      include: {
        Motel: true,
      },
    });
    handlePromise.push(updateMotel, accept);
    await Promise.all(handlePromise);

    return new ResponseCommon('successfully', 200);
  }
  async cancelTransactionSideRenter(userInfo, renterId: number) {
    const rent = await this.prismaService.rent.findUnique({
      where: {
        id: renterId,
        completed: true,
      },
    });
    if (!rent) {
      throw new NotFoundException('The rent do not found');
    }
    if (rent.idRenter !== userInfo.id) {
      throw new ForbiddenException('You are not the renter of this rent');
    }
    const updateRent = await this.prismaService.rent.update({
      where: {
        id: renterId,
      },
      data: {
        cancelSideRenter: true,
      },
    });
    return new ResponseCommon(updateRent, 200);
  }

  async cancelTransactionSideHost(userInfo, renterId: number) {
    const rent = await this.prismaService.rent.findUnique({
      where: {
        id: renterId,
        completed: true,
      },
      include: {
        Motel: true,
      },
    });
    if (!rent) {
      throw new NotFoundException('The rent do not found');
    }
    if (rent.Motel.idUser !== userInfo.id) {
      throw new ForbiddenException('You are not the host of this rent');
    }
    const updateRent = await this.prismaService.rent.update({
      where: {
        id: renterId,
      },
      data: {
        cancelSideHost: true,
      },
    });
    if (updateRent.cancelSideHost === updateRent.cancelSideRenter) {
      await this.prismaService.rent.delete({
        where: {
          id: renterId,
        },
      });
    }
    return new ResponseCommon(updateRent, 200);
  }
}
