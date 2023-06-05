// Determine if we're on the local development server
const isDevelopment = process.env.NODE_ENV === "development";

// Show environment condition
if (isDevelopment) {
  console.info({
    message: `💿 Remix App is running`,
    NODE_ENV: process.env.NODE_ENV,
  });
}

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],

  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",

  server: isDevelopment ? undefined : "./server-vercel.ts",
  serverBuildPath: "api/index.js",

  serverDependenciesToBundle: [
    "@remix-turborepo/internal-nobuild",
    "@remix-turborepo/database",
    "@remix-turborepo/business",
    "@remix-turborepo/ui",
  ],
  watchPaths: [
    "../../packages/ui/src/**/*",
    "../../packages/business/src/**/*",
    "../../packages/database/src/**/*",
    "../../packages/internal-nobuild/src/**/*",
  ],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  serverModuleFormat: "cjs",
};
