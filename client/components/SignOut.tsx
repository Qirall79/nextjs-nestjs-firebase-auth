'use client';

import { removeSession } from '@/lib/actions';
import { signOutFirebase } from '@/lib/firebase';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export const SignOut = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOutFirebase();
    await removeSession();
    router.push('/auth');
  };

  return (
    <>
      <Button color='danger' onClick={handleLogOut}>
        Log Out
      </Button>
    </>
  );
};
