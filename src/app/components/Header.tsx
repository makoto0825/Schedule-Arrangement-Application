'use client';
import Image from 'next/image';
import Link from 'next/link';
import { HiPlusSm } from 'react-icons/hi';
import { createClient } from '../utils/supabase/client';

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const signOut = async () => {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
        alert('Failed to sign out. Please try again.');
        return;
      }
      window.location.href = '/login';
    } catch (err) {
      console.error('Unexpected error during sign-out:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-12">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex shrink-0 items-center">
            <Link href="/dashboard">
              <Image
                src="/images/logo.svg"
                width={160}
                height={32}
                className="block"
                alt="Plansmart"
              />
            </Link>
          </div>
        </div>
        {isLoggedIn && (
          <div className="flex items-center">
            <Link
              href="/event/create"
              className="button-with-icon button-primary"
            >
              <HiPlusSm aria-hidden="true" className="size-5" />
              New Event
            </Link>
            <button
              type="button"
              className="block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-200 ml-2"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
