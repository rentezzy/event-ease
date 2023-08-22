require("eslint-plugin-import");
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
    },
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      1,
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
        pathGroups: [
          {
            pattern: "components",
            group: "internal",
          },
          {
            pattern: "common",
            group: "internal",
          },
          {
            pattern: "routes/ **",
            group: "internal",
          },
          {
            pattern: "assets/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
