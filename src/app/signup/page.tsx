import { signup } from "./actions";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-primary relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/noise-light.png')] before:bg-repeat">
      <div className="relative mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow rounded-lg sm:px-12">
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
              Already have an account?{" "}
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
