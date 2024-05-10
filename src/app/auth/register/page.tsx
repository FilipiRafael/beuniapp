"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import beUniLogo from "@/assets/beunilogo.png";
import { beUniApi } from "@/services/beUniApi";

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsLoading(false);
  };

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    beUniApi
      .post("/auth/local/register", {
        username: email,
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          resetForm();
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            redirect("/auth/login");
          }, 6000);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="relative flex sm:h-auto md:min-h-full lg:min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src={beUniLogo}
          alt="Your Company"
          width={0}
          height={0}
          priority={false}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="outline-none block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-primary dark:border-gray-800 dark:text-gray-100 dark:ring-gray-500 dark:placeholder-gray-400 dark:focus:ring-offset-gray-900"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                className="outline-none block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-primary dark:border-gray-800 dark:text-gray-100 dark:ring-gray-500 dark:placeholder-gray-400 dark:focus:ring-offset-gray-900"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
                className="outline-none block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-primary dark:border-gray-800 dark:text-gray-100 dark:ring-gray-500 dark:placeholder-gray-400 dark:focus:ring-offset-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 me-2 inline-flex items-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-75"
              disabled={
                isLoading ||
                (password.length === 8 &&
                  confirmPassword.length === 8 &&
                  password !== confirmPassword)
              }
            >
              {isLoading && (
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 me-3 text-orange-400 animate-spin dark:text-gray-600 fill-white dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              Create an account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-100">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold leading-6 text-orange-500 hover:text-orange-500"
          >
            Login here
          </Link>
        </p>
      </div>

      {showSuccessAlert && (
        <div
          className="absolute top-5 lg:left-5 lg:right-auto md:right-auto md:left-5 left-3 right-3 flex items-center p-4 text-sm text-orange-800 border border-orange-300 rounded-lg bg-orange-50 dark:bg-gray-800 dark:text-orange-400 dark:border-orange-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Conta criada!</span>
          <div>
            <span className="font-medium">Conta criada com sucess!</span> Agora
            você será redirecionado para fazer o seu login.
          </div>
        </div>
      )}
    </div>
  );
}
