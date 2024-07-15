import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: (error?: any) => void) {
    // Gets the request log
    console.log(req.method, req.originalUrl);
    next();
  }
}
