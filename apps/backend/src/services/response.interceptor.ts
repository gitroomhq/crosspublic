import {Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject} from '@nestjs/common';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from "axios";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        tap(async () => {
          const request = context.switchToHttp().getRequest();
          if (request.user && request.revalidate) {
            await axios.post(`${process.env.BACKEND_URL}/users/revalidate`, {}, {
              headers: {
                ...request.headers
              }
            });
          }
        }),
      );
  }
}
