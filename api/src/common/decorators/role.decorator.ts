import { SetMetadata } from '@nestjs/common';
import { typeUser } from '@prisma/client';

export const Admin = () => SetMetadata('role', [typeUser.ADMIN]);

export const AllUser = () =>
  SetMetadata('role', [typeUser.ADMIN, typeUser.HOST, typeUser.RENTER]);

export const Host = () => SetMetadata('role', [typeUser.HOST, typeUser.ADMIN]);
