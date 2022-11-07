module.exports = {
  root: true,
  env: { es6: true },
  ignorePatterns: ["build/*", "jest.setup.ts", "build.js"],
  overrides: [
    {
      // Plain JavaScript files
      files: ["**/*.js"],
      extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
      rules: {
        curly: ["error", "all"],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "never"],
        "no-plusplus": "off",
        "require-await": "error",
        "prettier/prettier": ["error"]
      }
    },
    {
      // All TypeScript files
      // These settings will also affect test and script files
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        project: "tsconfig.json",
        tsconfigRootDir: __dirname
      },
      plugins: ["@typescript-eslint", "jest", "import"],
      extends: [
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "prettier",
        "plugin:prettier/recommended"
      ],
      rules: {
        curly: ["error", "all"],
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "never"],
        "no-plusplus": "off",
        "require-await": "error",
        "prettier/prettier": ["error"],
        "@typescript-eslint/consistent-type-imports": ["error"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_$", varsIgnorePattern: "^_$" }],
        "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.test.ts", "**/test/*"] }]
      }
    },
    {
      // Just the TypeScript test files
      // These settings will only affect the tests
      files: ["*.test.ts", "tests/**/*.ts"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "jest/no-standalone-expect": "off"
      }
    }
  ]
}
