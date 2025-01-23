import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RESPONSE_MESSAGE_KEY } from 'src/decorator/responseMessage.decorator';

@Injectable()
export class ResponseMessageInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept<T>(context: ExecutionContext, next: CallHandler): Observable<T> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const responseMessage = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        if (responseMessage) {
          return {
            statusCode,
            time: new Date().toISOString(),
            success: true,
            message: responseMessage,
            data,
          };
        }
        return data;
      }),
    );
  }
}
