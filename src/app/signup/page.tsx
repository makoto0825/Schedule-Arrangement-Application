import { signup } from './actions';
import Image from 'next/image';
import Link from 'next/link';
import { Steps } from './Steps';

const Page = () => {
  return (
    <div className="flex min-h-full flex-1 lg:justify-center items-center lg:items-stretch px-6 py-12 lg:px-8 flex-col lg:flex-row-reverse gap-4">
      <div className="relative w-full lg:max-w-[680px] flex-1 shrink-0 flex flex-col">
        <div className="w-full flex-1 bg-primary relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/noise-light.png')] before:bg-repeat p-6 shadow rounded-lg lg:p-12 flex flex-col">
          <Steps />
        </div>
      </div>
      <div className="relative lg:max-w-[480px] flex-1 flex flex-col">
        <div className="bg-white px-6 py-12 shadow rounded-lg sm:px-12 flex-1 flex flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              src="/images/logo.svg"
              width={160}
              height={32}
              alt="Plansmart"
            />
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-primary">
              Effortlessly find the best time to plan events with friends.
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="input-text"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="input-text"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="button button-primary w-full"
                  formAction={signup}
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-foreground-weak">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-blue-500"
              >
                Sign in here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
