import { SignIn } from '@/components/SignIn';
import { getServerSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default async function Home() {
  const session = await getServerSession();

  if (session) return redirect('/');

  return (
    <main className='flex w-full min-h-screen flex-col items-center justify-between p-12'>
      <Toaster />
      <SignIn />
    </main>
  );
}
