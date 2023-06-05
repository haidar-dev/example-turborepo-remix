# Remix with Turborepo

Remix with Turborepo, Prisma, PostgreSQL, Docker, pnpm, Tailwind CSS, and Tsyringe DI.

### Quick Start

#### Create Remix App

```sh
pnpx create-remix@latest --install --typescript --template https://github.com/haidar-dev/remix-turborepo
```

> 💿 This repository is opiniated:
>
> - **TypeScript** only, if you choose JavaScript nothing will happen.
> - Only compatible with **pnpm** package manager to handle monorepo workspaces.

#### Cloning the repository

```sh
git clone git@github.com:haidar-dev/remix-turborepo.git
cd remix-turborepo
pnpm add -w @remix-run/dev
pnpm remix init
```

## What's in the stack

This stack is a Remix oriented Monorepo powered by Turborepo and [pnpm workspaces](https://pnpm.io/workspaces). Containing a ready-to-deploy Remix App with Docker container.

This Package **uses `pnpm` as the package manager** of choice to manage workspaces. It may work with `yarn` and `npm` if you put the workspace definitions in the package.json file but there is no guarantee.

### Monorepo architecture powered by [Turborepo](https://turborepo.org) and pnpm workspaces:

- `apps` Folder containing the applications
  - [`remix-app`](https://github.com/haidar-dev/remix-turborepo/tree/main/apps/remix-app): the [Remix.run](https://remix.run) app
  - [`nextjs-app`](https://github.com/haidar-dev/remix-turborepo/tree/main/apps/nextjs-app): a [Next.js](https://nextjs.org) app
- `packages` Folder containing examples
  - [`database`](https://github.com/haidar-dev/remix-turborepo/tree/main/packages/database): a [Prisma](https://prisma.io) wrapper ready to be used in other packages, or apps. Bundled with [tsup](https://tsup.egoist.dev).
  - [`business`](https://github.com/haidar-dev/remix-turborepo/tree/main/packages/business): an example package using [Tsyringe](https://github.com/microsoft/tsyringe) to inject the Prisma `database` as a dependency and using a _repository pattern_ like example.
  - [`internal-nobuild`](https://github.com/haidar-dev/remix-turborepo/tree/main/packages/internal-nobuild): an example package that is pure TypeScript with no build steps. The `main` entrypoint to the package is directly `src/index.ts`. Remix takes care of compiling with its own build step (with esbuild). This packages also contains unit test with Vitest.
    Remix uses `tsconfig.json` paths to reference to that project and its types. _I would recommend these types of **internal** packages when you don't plan on publishing the package._
  - [`ui`](https://github.com/haidar-dev/remix-turborepo/tree/main/packages/ui): a dummy React UI library (which contains a single `<Button>` component), build with tsup.
- `config-packages`:
  - Eslint packages with different preset configs.
  - TS Configs, also with different presets.
  - [Tailwind](https://tailwindcss.com) configs.

### What else ?

- Remix App [Multi-region Fly app deployment](https://fly.io/docs/reference/scaling) with [Docker](https://www.docker.com)
- Remix App Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) to check for code quality and testing.
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com) inside the different packages.
- Code formatting with [Prettier](https://prettier.io)
- Static Types with [TypeScript](https://typescriptlang.org)
- End-to-end testing with Playwright later on in the Remix App

> **Warning**
> All the following commands should be launched from the **monorepo root directory**

## Development

### Install the dependencies

```sh
pnpm install
```

You also have to setup env, copy the example `.env.example`:

```sh
cp .env.example .env
cp .env.example .env.docker
```

### Start the postgresql docker contai

ner

```sh
pnpm docker:db
```

> **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

### Generate prisma schema

```sh
pnpm generate
```

### Run the Prisma schema push or migration to the database

```sh
pnpm db:push
# OR
pnpm db:migrate:deploy
```

### Seed data and check in the studio

```sh
pnpm db:seed
pnpm db:studio
```

### Run the first build (with dependencies via the `...` option)

```sh
pnpm build --filter=@remix-turborepo/remix-app...
```

**Running simply `pnpm build` will build everything, including the NextJS app.**

### Run the Remix dev server

```sh
pnpm dev --filter=@remix-turborepo/remix-app
```

## Create packages

### Internal package

```sh
turbo gen workspace --name @remix-turborepo/foobarbaz --type package --copy
```

Then follow the prompts

## Tests, Typechecks, Lint, Install packages...

Check the `turbo.json` file to see the available pipelines.

### Lint everything

```sh
pnpm lint
```

### Typecheck the whole monorepo

```sh
pnpm typecheck
```

### Test the whole monorepo

```sh
pnpm test
or
pnpm test:dev
```

### How to install an npm package in the Remix app ?

```sh
pnpm add dayjs --filter remix-app
```

Tweak the tsconfigs, eslint configs in the `config-package` folder. Any package or app will
then extend from these configs.

## Deployment

> **Warning**
> All the following commands should be launched from the **monorepo root directory**

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Manually Build The Docker Image to deploy with Fly.io

- Create a docker network
  ```
  docker network create app_network
  ```
- Build the docker image
  ```sh
  pnpm docker:build:remix-app
  ```
- Run the docker Image
  ```sh
  pnpm docker:run:remix-app
  ```

## Useful Turborepo Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)

## Support

If you found the template useful, please consider giving it a [Star ⭐](https://github.com/haidar-dev/remix-turborepo). Thanks you!

## Disclaimer

I am in no way an expert on Monorepo, Docker or CI. The setup proposed here is one of many and probably could be improved 10x, but I am learning by myself along the way, so if you see any possible improvement please submit a PR. I will appreciate it greatly !
