import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { SessionCookieOptions } from 'firebase-admin/lib/auth/base-auth';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService
            .get('FIREBASE_PRIVATE_KEY')
            .replace('/\\n/g', '\n'),
        }),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  getAuth() {
    return this.firebaseApp.auth();
  }

  async createSessionCookie(idToken: string, options: SessionCookieOptions) {
    return this.getAuth().createSessionCookie(idToken, options);
  }

  extractSessionCookie(req: any) {
    return req.headers.cookie
      .split('; ')
      .filter((c: string) => c.includes('session='))[0]
      .split('=')[1];
  }
}
