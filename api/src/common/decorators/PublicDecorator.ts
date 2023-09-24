import { SetMetadata } from '@nestjs/common';

export const PublicDecorator = () => SetMetadata('global', true);
