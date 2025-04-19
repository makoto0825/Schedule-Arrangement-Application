import Image from "next/image";
import Link from "next/link";
import { login } from "./actions";

const page = () => {
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
              Sign in to your account
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-primary hover:text-blue-500"
                    >
                      Forgot password?
                    </a>
                  </div>
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
                  formAction={login}
                  type="submit"
                  className="button button-primary w-full"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-foreground-weak">
              Not a member?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:text-blue-500"
              >
                Sign up now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
