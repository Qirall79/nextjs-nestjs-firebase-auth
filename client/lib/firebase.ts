import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAile2r7A_GolxBDmFgyadLJOWLqgbpvDg',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google auth
const googleProvider = new GoogleAuthProvider();
export const googleSignIn = async () => {
  await signInWithPopup(auth, googleProvider);
  return await auth.currentUser?.getIdToken();
};

// Facebook auth
const facebookProvider = new FacebookAuthProvider();
export const facebookSignIn = async () => {
  await signInWithPopup(auth, facebookProvider);
  return await auth.currentUser?.getIdToken();
};

// Email/Password auth
export const emailSignUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
  return await auth.currentUser?.getIdToken();
};

export const emailSignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
  return await auth.currentUser?.getIdToken();
};

export const signOutFirebase = async () => {
  await signOut(auth);
};

export const extractErrorMessage = (error: any) => {
  let msg: string = error.message
    .split(' ')[2]
    .split('/')[1]
    .slice(0, -2)
    .replaceAll('-', ' ');

  msg = msg[0].toUpperCase() + msg.slice(1);
  return msg;
};
