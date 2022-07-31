import { createParamDecorator, SetMetadata, ExecutionContext } from '@nestjs/common';
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator';

// export const Emailpipe = (...args: string[]) => SetMetadata('emailpipe', args);
export const Emailpipe = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(data, request.body);
    return request.body.email;
  },)

