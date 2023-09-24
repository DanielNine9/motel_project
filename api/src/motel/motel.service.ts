import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMotelType, UpdateMotelType } from './types';
import { ResponseCommon } from 'src/common/dtos';
import { ResponseMotel } from './dtos';

@Injectable()
export class MotelService {
  private readonly optionsInclude = {
    include: {
      host: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          contact: true,
          email: true,
          address: true,
          imageURL: true,
        },
      },
      images: {
        select: {
          id: true,
          fileName: true,
        },
      },
    },
  };
  private readonly itemsPerPage = 9;

  constructor(private readonly prismaService: PrismaService) {}

  async getTotal() {
    const totalItems = await this.prismaService.motel.count();
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return [totalItems, totalPages];
  }

  async createMotel(body: CreateMotelType, id: number) {
    const newMotel = await this.prismaService.motel.create({
      data: {
        name: body.name,
        nation: body.nation,
        local: body.local,
        booked: 0,
        quantity: body.quantity,
        reviews: 0,
        desc: body.desc,
        title: body.title,
        amenities: body.amenities,
        price: body.price,
        discount: body.discount,
        images: {
          createMany: {
            data: body.images.map((image) => ({
              fileName: image,
            })),
          },
        },
        host: {
          connect: {
            id: id,
          },
        },
      },
      ...this.optionsInclude,
    });

    return new ResponseCommon(newMotel, 201);
  }

  async getMotel(idMotel: number) {
    const motel = await this.prismaService.motel.findUnique({
      where: {
        id: idMotel,
        deleted: false,
      },
      ...this.optionsInclude,
    });
    if (!motel) {
      throw new NotFoundException('Motel not found');
    }
    const updateMotel = await this.prismaService.motel.update({
      where: {
        id: motel.id,
      },
      data: {
        reviews: motel.reviews + 1,
      },
      ...this.optionsInclude,
    });
    return new ResponseCommon(updateMotel, 200);
  }

  async getMotels(query) {
    const pageNumber = query?.pageNumber ? query.pageNumber : 1;
    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);
    const skip = (pageNumber - 1) * this.itemsPerPage;
    const where: any = { deleted: false, AND: [] };
    if (query.minPrice) {
      where.AND.push({ price: { gte: minPrice } });
    }
    if (query.maxPrice) {
      where.AND.push({ price: { lte: maxPrice } });
      if (minPrice > maxPrice) {
        where.AND = [];
      }
    }

    if (query.name) {
      where.AND.push({ name: { contains: query.name } });
    }

    if (query.local) {
      where.AND.push({ local: { contains: query.local } });
    }

    if (where.AND.length === 0) {
      delete where.AND;
    }

    const motel = await this.prismaService.motel.findMany({
      where,
      ...this.optionsInclude,
      skip,
      take: this.itemsPerPage,
    });

    const [totalItems, totalPages] = await this.getTotal();
    return new ResponseCommon(
      new ResponseMotel(motel, totalItems, totalPages),
      200,
    );
  }

  async updateMotel(idMotel: number, body: UpdateMotelType) {
    const motel = await this.prismaService.motel.findUnique({
      where: {
        id: idMotel,
        deleted: false,
      },
    });
    if (!motel) {
      throw new NotFoundException('Motel not found');
    }
    const updatedImages: any[] = [];

    // if (body.images) {
    //   for (const image of body.images) {
    //     if (image.id) {
    //       const updatedImage = this.prismaService.image.update({
    //         where: { id: image.id },
    //         data: { fileName: image.fileName },
    //       });
    //       updatedImages.push(updatedImage);
    //     } else {
    //       const newImage = this.prismaService.image.create({
    //         data: {
    //           fileName: image.fileName,
    //           Motel: { connect: { id: motel.id } },
    //         },
    //       });

    //       updatedImages.push(newImage);
    //     }
    //   }

    //   const update = await Promise.all(updatedImages);
    //   delete body.images;
    // }

    await this.prismaService.image.deleteMany({
      where: {
        idMotel: motel.id,
      },
    });
    if (body.images) {
      const newImages = await this.prismaService.image.createMany({
        data: body.images.map((fileName) => ({
          fileName,
          idMotel: motel.id,
        })),
      });
      delete body.images;
    }
    const updateMotel = await this.prismaService.motel.update({
      where: {
        id: idMotel,
      },
      //@ts-ignore
      data: body,
      ...this.optionsInclude,
    });
    return updateMotel;
  }

  async deleteMotel(motelId: number) {
    const motel = await this.prismaService.motel.findUnique({
      where: {
        id: motelId,
        deleted: false,
      },
    });
    if (!motel) {
      throw new NotFoundException('Motel not found');
    }
    const updateMotel = await this.prismaService.motel.update({
      where: {
        id: motelId,
      },
      data: {
        deleted: true,
      },
      ...this.optionsInclude,
    });
    return updateMotel;
  }

  async myMotelDeleted(userInfo) {
    const motels = await this.prismaService.motel.findMany({
      where: {
        idUser: userInfo.id,
        deleted: true,
      },
    });
    return new ResponseCommon(motels, 200);
  }

  async forceDeleteMotel(motelId: number) {
    const motel = await this.prismaService.motel.findUnique({
      where: {
        id: motelId,
      },
    });
    if (!motel) {
      throw new NotFoundException('Motel not found');
    }
    await this.prismaService.image.deleteMany({
      where: {
        idMotel: motel.id,
      },
    });
    await this.prismaService.motel.delete({
      where: {
        id: motelId,
      },
    });
    return new ResponseCommon('successfully', 200);
  }

  async getTopSelling() {
    const topMotel = await this.prismaService.motel.findMany({
      orderBy: {
        booked: 'desc',
      },
      take: this.itemsPerPage,
      ...this.optionsInclude,
    });
    return new ResponseCommon(topMotel, 200);
  }

  async getTopDiscount() {
    const topMotel = await this.prismaService.motel.findMany({
      orderBy: {
        discount: 'desc',
      },
      take: this.itemsPerPage,
      ...this.optionsInclude,
    });
    return new ResponseCommon(topMotel, 200);
  }

  async myMotels(user) {
    const myMotels = await this.prismaService.motel.findMany({
      where: {
        idUser: user.id,
        deleted: false,
      },
    });

    if (!myMotels) {
      throw new NotFoundException('You do not have the motel');
    }

    return new ResponseCommon(myMotels, 200);
  }

  async restoreMotel(userInfo, motelId) {
    const motel = await this.prismaService.motel.findFirst({
      where: {
        id: motelId,
        idUser: userInfo.id,
      },
    });
    if (!motel) {
      throw new NotFoundException('The motel do not found');
    }

    const updateMotel = await this.prismaService.motel.update({
      where: {
        id: motelId,
      },
      data: {
        deleted: false,
      },
    });

    return updateMotel;
  }

  async restoreAllMotel(userInfo) {
    const motels = await this.prismaService.motel.findMany({
      where: {
        id: userInfo.id,
        deleted: true,
      },
    });
    if (motels) {
      await this.prismaService.motel.updateMany({
        where: {
          id: {
            in: motels.map((motel) => motel.id),
          },
        },
        data: {
          deleted: false,
        },
      });
    }
    return new ResponseCommon('successfully', 200);
  }
}
