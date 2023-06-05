"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod), __decorateClass = (decorators, target, key, kind) => {
  for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
  return kind && result && __defProp(target, key, result), result;
};

// server-vercel.ts
var server_vercel_exports = {};
__export(server_vercel_exports, {
  default: () => server_vercel_default
});
module.exports = __toCommonJS(server_vercel_exports);

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
      {
        onShellReady: () => {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-SGFI4BBA.css";

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), links = () => [{ rel: "stylesheet", href: tailwind_default }], meta = () => [
  { charset: "utf-8" },
  { title: "Remix Gospel Stack" },
  { viewport: "width=device-width,initial-scale=1" }
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { className: "bg-white dark:bg-gray-950 dark:text-white", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
    ] })
  ] });
}

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader
});

// ../../packages/business/src/container.ts
var import_reflect_metadata = require("reflect-metadata"), import_tsyringe2 = require("tsyringe");

// ../../packages/database/src/client.ts
var import_client = require("@prisma/client"), prisma = global.prisma || new import_client.PrismaClient();

// ../../packages/business/src/repositories/user-repository.ts
var import_tsyringe = require("tsyringe");
var PrismaUserRepository = class {
  constructor(prisma2) {
    this.prisma = prisma2;
    this.prisma = import_tsyringe.container.resolve("PrismaClient");
  }
  async getUsers() {
    return this.prisma.user.findMany();
  }
  async getUsersCount() {
    return this.prisma.user.count();
  }
};
PrismaUserRepository = __decorateClass([
  (0, import_tsyringe.autoInjectable)()
], PrismaUserRepository);

// ../../packages/business/src/container.ts
import_tsyringe2.container.register("PrismaClient", {
  useValue: prisma
});
import_tsyringe2.container.register(
  "UserRepository",
  { useClass: PrismaUserRepository },
  { lifecycle: import_tsyringe2.Lifecycle.Singleton }
);

// ../../packages/business/src/shared/utils.ts
function helloWorld(name) {
  return `Server Hello World to ${name}`;
}

// ../../packages/business/src/index.ts
var Service = {
  userRepository: import_tsyringe2.container.resolve("UserRepository")
};

// app/services.server.ts
var services_server_default = Service;

// app/routes/healthcheck.tsx
var loader = async ({ request }) => {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`), [count] = await Promise.all([
      services_server_default.userRepository.getUsersCount(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]);
    return new Response(`OK: ${count}`);
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
};

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => Index,
  loader: () => loader2
});
var import_node2 = require("@remix-run/node"), import_react3 = require("@remix-run/react");

// ../../packages/internal-nobuild/src/sales-person.ts
function lookUpSalesPersonForZipcode(zipcode, salesPersonDirectory) {
  for (let salesPerson of salesPersonDirectory)
    return { name: salesPerson.name, email: salesPerson.email };
}

// ../../packages/ui/src/Button.tsx
var import_jsx_runtime3 = require("react/jsx-runtime"), Button = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "fleitems-center justify-center rounded border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white no-underline hover:bg-blue-700 active:bg-blue-800 md:px-10 md:py-3 md:text-lg md:leading-6", children: "Button from UI" });

// ../../packages/ui/src/index.tsx
var helloFromUILibrary = () => "Function export from UI Library";

// app/routes/_index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), loader2 = async ({ request }) => {
  let users = await services_server_default.userRepository.getUsers();
  return (0, import_node2.json)({ users, serverValue: helloWorld("Remix Turborepo") });
};
function Index() {
  var _a, _b;
  let { serverValue, users } = (0, import_react3.useLoaderData)(), salesPersons = [
    {
      name: "mark",
      email: "mark@anison.dev"
    },
    {
      name: "coltrane",
      email: "coltrane@anison.dev"
    },
    {
      name: "philippe",
      email: "philippe@anison.dev"
    },
    {
      name: "lance",
      email: "lance@anison.dev"
    },
    {
      name: "john",
      email: "john@anison.dev"
    },
    {
      name: "mike",
      email: "mike@anison.dev"
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("main", { className: "relative min-h-screen sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative sm:pb-16 sm:pt-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h1", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "block text-2xl font-extrabold uppercase tracking-tight text-blue-500 sm:text-4xl ", children: "Anison Stack" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "block text-xl sm:text-2xl", children: "Turborepo, Remix, Tailwind CSS, etc" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mt-6 flex flex-wrap justify-center gap-8", children: [
      {
        src: "https://user-images.githubusercontent.com/4060187/106504110-82f58d00-6494-11eb-87b7-a16d4f68bc5a.png",
        alt: "Turborepo",
        href: "https://turborepo.org"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/158238105-e7279a0c-1640-40db-86b0-3d3a10aab824.svg",
        alt: "PostgreSQL",
        href: "https://postgresql.org/"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
        alt: "Prisma",
        href: "https://prisma.io"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
        alt: "Tailwind",
        href: "https://tailwindcss.com"
      },
      {
        src: "https://user-images.githubusercontent.com/4941205/192078609-3f08928d-2811-4a33-ab32-062a77836d57.svg",
        alt: "pnpm",
        href: "https://pnpm.io/"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
        alt: "Vitest",
        href: "https://vitest.dev"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
        alt: "Testing Library",
        href: "https://testing-library.com"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
        alt: "Prettier",
        href: "https://prettier.io"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
        alt: "ESLint",
        href: "https://eslint.org"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
        alt: "TypeScript",
        href: "https://typescriptlang.org"
      }
    ].map((img) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "a",
      {
        href: img.href,
        className: "flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0",
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { alt: img.alt, src: img.src, className: "object-contain" })
      },
      img.href
    )) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mx-auto mt-12 flex max-w-7xl flex-col gap-8 px-4 py-2 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h2", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "block text-lg font-semibold text-orange-600", children: "packages/business, packages/database" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mt-1 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl", children: "Server packages" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h3", { className: "mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400", children: [
          "Display prisma users from the business function",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "bg-gray-200 px-1 text-orange-600 dark:bg-gray-800", children: "Service.userRepository.getUsers()" }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "prose prose-lg mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", { className: "text-xs", children: JSON.stringify(users, null, 2) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h3", { className: "mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400", children: [
          "Regular server value passed from Loader here",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "bg-gray-200 px-1 text-orange-600 dark:bg-gray-800", children: "serverValue" }),
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "prose prose-lg mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("blockquote", { className: "prose dark:prose-invert", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: serverValue }) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h2", { className: "mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "block text-lg font-semibold text-orange-600", children: "packages/ui" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl", children: "UI Packages" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400", children: 'This is an example Button Component from "ui" packages' }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mx-auto flex max-w-sm flex-col items-start sm:flex sm:max-w-none", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h3", { className: "mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400", children: [
          "Result of function",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "bg-gray-200 px-1 text-orange-600 dark:bg-gray-800", children: "helloFromUILibrary" }),
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "prose prose-lg mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("blockquote", { className: "prose dark:prose-invert", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: helloFromUILibrary() }) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h2", { className: "mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "block text-lg font-semibold text-orange-600", children: "packages/internal-nobuild" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mt-2 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl", children: "Internal TS Package with no build step" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h3", { className: "mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400", children: [
          "Result of function",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "text-md bg-gray-200 px-1 text-orange-600 dark:bg-gray-800", children: 'lookUpSalesPersonForZipcode("97", salesPersons)' }),
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "prose prose-lg mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("blockquote", { className: "prose dark:prose-invert", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: (_a = lookUpSalesPersonForZipcode("974", salesPersons)) == null ? void 0 : _a.email }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h3", { className: "mt-3 block text-lg font-semibold text-gray-600 dark:text-gray-400", children: [
          "Result of function",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { className: "text-md bg-gray-200 px-1 text-orange-600 dark:bg-gray-800", children: 'lookUpSalesPersonForZipcode("63", salesPersons)' }),
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "prose prose-lg mt-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("blockquote", { className: "prose dark:prose-invert", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: (_b = lookUpSalesPersonForZipcode("63", salesPersons)) == null ? void 0 : _b.email }) }) })
      ] })
    ] })
  ] }) });
}
function ErrorBoundary() {
  let error = (0, import_react3.useRouteError)();
  if ((0, import_react3.isRouteErrorResponse)(error))
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { children: "Oops" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { children: [
        "Status: ",
        error.status
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: error.data.message })
    ] });
  let errorMessage = "Unknown error";
  return error instanceof Error && (errorMessage = error.message), /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "relative min-h-screen sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mx-auto flex max-w-2xl flex-col gap-4 rounded-md bg-slate-50 p-12", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "text-3xl font-bold text-slate-900", children: "Uh oh ..." }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-slate-700", children: "Something went wrong." }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", { className: "overflow-scroll rounded-md border border-slate-300 bg-white p-4 text-red-500", children: errorMessage })
  ] }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-QPR7IFCH.js", imports: ["/build/_shared/chunk-LHJWPPDS.js", "/build/_shared/chunk-ACEA3KT5.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-RHECRJIV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-EOU3LS7G.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/healthcheck": { id: "routes/healthcheck", parentId: "root", path: "healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/healthcheck-EK7SNO75.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, version: "b6a0f792", hmr: void 0, url: "/build/manifest-B6A0F792.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};

// server-vercel.ts
var import_node3 = require("@remix-run/node"), import_vercel = require("@remix-run/vercel");
(0, import_node3.installGlobals)();
var server_vercel_default = (0, import_vercel.createRequestHandler)({ build: server_build_exports, mode: "production" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
