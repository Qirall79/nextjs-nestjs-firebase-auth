import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (
      req.headers['authorization'] &&
      typeof req.headers['authorization'] == 'string'
    ) {
      const idToken = req.headers['authorization'].split(' ')[1];

      try {
        this.firebaseService.getAuth().verifyIdToken(idToken);
        req.token = idToken;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
