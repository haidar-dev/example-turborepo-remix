module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@remix-turborepo/eslint-config`
  extends: ["@remix-turborepo/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
};
