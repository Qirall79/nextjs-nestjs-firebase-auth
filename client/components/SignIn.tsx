'use client';

import { createSession, createUser, upsertUser } from '@/lib/actions';
import {
  emailSignIn,
  emailSignUp,
  extractErrorMessage,
  facebookSignIn,
  googleSignIn,
} from '@/lib/firebase';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

import { AuthError } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';

export const SignIn = () => {
  const router = useRouter();
  const [operation, setOperation] = useState<'signIn' | 'signUp'>('signIn');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const socialSignIn = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      let idToken: string | undefined;
      if (provider === 'facebook') idToken = await facebookSignIn();
      else idToken = await googleSignIn();
      await createSession(idToken as string);
      await upsertUser();
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      console.log('Error signing in with ' + provider);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let idToken: string | undefined;
      if (operation == 'signIn')
        idToken = await emailSignIn(formData.email, formData.password);
      else idToken = await emailSignUp(formData.email, formData.password);
      const session = await createSession(idToken as string);

      if (operation == 'signUp' && session.status == 'success')
        await createUser(formData.firstName, formData.lastName);
      setIsLoading(false);
      router.push('/');
    } catch (error: any) {
      if (error instanceof FirebaseError)
        toast.error(extractErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-[500px] flex flex-col space-y-6'>
      <div className='w-full flex flex-col border border-slate-500 p-8 rounded-md space-y-4'>
        <h2 className='text-3xl mb-4'>Sign Up</h2>

        <form className='flex flex-col space-y-4'>
          {operation == 'signUp' && (
            <>
              <Input
                onChange={(e) => {
                  setFormData((oldValue) => {
                    return {
                      ...oldValue,
                      firstName: e.target.value,
                    };
                  });
                }}
                variant='bordered'
                placeholder='John'
                label='First Name'
              />
              <Input
                onChange={(e) => {
                  setFormData((oldValue) => {
                    return {
                      ...oldValue,
                      lastName: e.target.value,
                    };
                  });
                }}
                variant='bordered'
                placeholder='Doe'
                label='Last Name'
              />
            </>
          )}

          <Input
            onChange={(e) => {
              setFormData((oldValue) => {
                return {
                  ...oldValue,
                  email: e.target.value,
                };
              });
            }}
            type='email'
            label='Email'
            variant='bordered'
            placeholder='example@mail.com'
          />
          <Input
            onChange={(e) => {
              setFormData((oldValue) => {
                return {
                  ...oldValue,
                  password: e.target.value,
                };
              });
            }}
            label='Password'
            variant='bordered'
            placeholder='Enter your password'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <IoIosEyeOff className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <IoIosEye className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
          />
          <Button
            onClick={handleEmailSignUp}
            type='submit'
            variant='ghost'
            color='warning'
            isDisabled={isLoading}
          >
            Sign Up
          </Button>
        </form>

        <hr />

        <Button
          variant='ghost'
          color='danger'
          isDisabled={isLoading}
          onClick={() => {
            socialSignIn('google');
          }}
        >
          Continue with Google
        </Button>
        <Button
          variant='ghost'
          color='primary'
          isDisabled={isLoading}
          onClick={() => {
            socialSignIn('facebook');
          }}
        >
          Continue with Facebook
        </Button>
        <p>
          Don&apos;t have an account ?{' '}
          <span
            className='font-bold cursor-pointer text-teal-600'
            onClick={() => {
              setOperation((state) =>
                state === 'signIn' ? 'signUp' : 'signIn'
              );
            }}
          >
            {operation === 'signIn' ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
};
