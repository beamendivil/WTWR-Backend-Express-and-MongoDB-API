module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ["dist"],
  extends: "airbnb-base",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
      },
    },
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-console": "off",
    "no-new": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["server.js", "**/*.test.js", "**/*.spec.js"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "always",
      },
    ],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
