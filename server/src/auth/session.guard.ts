import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const session = this.firebaseService.extractSessionCookie(req);

    if (!session) return false;
    else {
      try {
        const decodedToken = await this.firebaseService
          .getAuth()
          .verifySessionCookie(session);
        req.auth = decodedToken;
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}
