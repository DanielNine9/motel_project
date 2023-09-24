import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ATGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const global = this.reflector.getAllAndOverride('global', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (global) {
      return true;
    }
    return super.canActivate(context);
  }
}
