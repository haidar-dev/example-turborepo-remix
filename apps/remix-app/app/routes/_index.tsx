import React from "react";
import { json, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import {
  lookUpSalesPersonForZipcode,
  type SalesPersonDirectory,
} from "@remix-turborepo/internal-nobuild";
import { Button, helloFromUILibrary } from "@remix-turborepo/ui";

import Service, { helloWorld } from "~/services.server";

export const loader = async ({ request }: LoaderArgs) => {
  const users = await Service.userRepository.getUsers();
  return json({ users, serverValue: helloWorld("Remix Turborepo") });
};

export default function Index() {
  const { serverValue, users } = useLoaderData<typeof loader>();
  const salesPersons: SalesPersonDirectory = [
    {
      name: "mark",
      email: "mark@anison.dev",
    },
    {
      name: "coltrane",
      email: "coltrane@anison.dev",
    },
    {
      name: "philippe",
      email: "philippe@anison.dev",
    },
    {
      name: "lance",
      email: "lance@anison.dev",
    },
    {
      name: "john",
      email: "john@anison.dev",
    },
    {
      name: "mike",
      email: "mike@anison.dev",
    },
  ];

  return (
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-center">
            <span className="block text-2xl font-extrabold uppercase tracking-tight text-blue-500 sm:text-4xl ">
              Anison Stack
            </span>
            <span className="block text-xl sm:text-2xl">
              Turborepo, Remix, Tailwind CSS, etc
            </span>
          </h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {[
              {
                src: "https://user-images.githubusercontent.com/4060187/106504110-82f58d00-6494-11eb-87b7-a16d4f68bc5a.png",
                alt: "Turborepo",
                href: "https://turborepo.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/158238105-e7279a0c-1640-40db-86b0-3d3a10aab824.svg",
                alt: "PostgreSQL",
                href: "https://postgresql.org/",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
                alt: "Prisma",
                href: "https://prisma.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
                alt: "Tailwind",
                href: "https://tailwindcss.com",
              },
              {
                src: "https://user-images.githubusercontent.com/4941205/192078609-3f08928d-2811-4a33-ab32-062a77836d57.svg",
                alt: "pnpm",
                href: "https://pnpm.io/",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
                alt: "Vitest",
                href: "https://vitest.dev",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <a
                key={img.href}
                href={img.href}
                className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
              >
                <img alt={img.alt} src={img.src} className="object-contain" />
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-8 px-4 py-2 sm:px-6 lg:px-8">
          <div>
            <h2>
              <code className="block text-lg font-semibold text-orange-600">
                packages/business, packages/database
              </code>
              <span className="mt-1 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Server packages
              </span>
            </h2>
            <h3 className="mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400">
              Display prisma users from the business function{" "}
              <code className="bg-gray-200 px-1 text-orange-600 dark:bg-gray-800">
                Service.userRepository.getUsers()
              </code>
              .
            </h3>
            <div className="prose prose-lg mt-4">
              <pre className="text-xs">{JSON.stringify(users, null, 2)}</pre>
            </div>

            <h3 className="mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400">
              Regular server value passed from Loader here{" "}
              <code className="bg-gray-200 px-1 text-orange-600 dark:bg-gray-800">
                serverValue
              </code>
              :
            </h3>
            <div className="prose prose-lg mt-4">
              <blockquote className="prose dark:prose-invert">
                <p>{serverValue}</p>
              </blockquote>
            </div>
          </div>
          <div>
            <h2 className="mt-4">
              <code className="block text-lg font-semibold text-orange-600">
                packages/ui
              </code>
              <span className="mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                UI Packages
              </span>
            </h2>
            <h3 className="mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400">
              This is an example Button Component from "ui" packages
            </h3>
            <div className="mx-auto flex max-w-sm flex-col items-start sm:flex sm:max-w-none">
              <Button />
            </div>
            <h3 className="mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400">
              Result of function{" "}
              <code className="bg-gray-200 px-1 text-orange-600 dark:bg-gray-800">
                helloFromUILibrary
              </code>
              :
            </h3>
            <div className="prose prose-lg mt-4">
              <blockquote className="prose dark:prose-invert">
                <p>{helloFromUILibrary()}</p>
              </blockquote>
            </div>
          </div>
          <div>
            <h2 className="mt-4">
              <code className="block text-lg font-semibold text-orange-600">
                packages/internal-nobuild
              </code>
              <span className="mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Internal TS Package with no build step
              </span>
            </h2>
            <h3 className="mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400">
              Result of function{" "}
              <code className="text-md bg-gray-200 px-1 text-orange-600 dark:bg-gray-800">
                lookUpSalesPersonForZipcode("97", salesPersons)
              </code>
              :
            </h3>
            <div className="prose prose-lg mt-4">
              <blockquote className="prose dark:prose-invert">
                <p>{lookUpSalesPersonForZipcode("974", salesPersons)?.email}</p>
              </blockquote>
            </div>
            <h3 className="mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400">
              Result of function{" "}
              <code className="text-md bg-gray-200 px-1 text-orange-600 dark:bg-gray-800">
                lookUpSalesPersonForZipcode("63", salesPersons)
              </code>
              :
            </h3>
            <div className="prose prose-lg mt-4">
              <blockquote className="prose dark:prose-invert">
                <p>{lookUpSalesPersonForZipcode("63", salesPersons)?.email}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-md bg-slate-50 p-12">
        <h1 className="text-3xl font-bold text-slate-900">Uh oh ...</h1>
        <p className="text-slate-700">Something went wrong.</p>
        <pre className="overflow-scroll rounded-md border border-slate-300 bg-white p-4 text-red-500">
          {errorMessage}
        </pre>
      </div>
    </div>
  );
}
