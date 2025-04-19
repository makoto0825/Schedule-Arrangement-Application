import Link from 'next/link';
import { HiPlusSm } from 'react-icons/hi';

export const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex shrink-0 items-center">
            <Link
              href="/dashboard"
              className="text-2xl font-bold button bg-foreground text-background w-8 h-8"
            >
              S
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="shrink-0">
            {isLoggedIn && (
              <Link
                href="/event/create"
                className="button-with-icon button-primary"
              >
                <HiPlusSm aria-hidden="true" className="size-5" />
                New Event
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
