import { SignIn } from '@/components/SignIn';
import { SignOut } from '@/components/SignOut';
import { getServerSession } from '@/lib/session';
import { cookies } from 'next/headers';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p>{session ? 'Logged in as ' + session.user.name : 'Logged out'}</p>
      {session && <SignOut />}
    </main>
  );
}
