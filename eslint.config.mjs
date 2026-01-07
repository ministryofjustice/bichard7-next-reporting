import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import jestPlugin from "eslint-plugin-jest"
import importPlugin from "eslint-plugin-import"

export default [
  // Global ignores
  {
    ignores: ["build/*", "jest.setup.ts", "build.js"]
  },

  // Plain JavaScript files
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.es2020,
        ...globals.node
      }
    },
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
      curly: ["error", "all"],
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "never"],
      "no-plusplus": "off",
      "require-await": "error",
      "prettier/prettier": ["error"]
    }
  },

  // All TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        project: "./tsconfig.json"
      },
      globals: {
        ...globals.es2020,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jest: jestPlugin,
      import: importPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,
      ...prettier.rules,
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

  // TypeScript test files
  {
    files: ["**/*.test.ts", "**/*.e2e.test.ts", "**/*.integration.test.ts", "tests/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "jest/no-standalone-expect": "off"
    }
  },

  // .ncurc.js specific config
  {
    files: [".ncurc.js"],
    rules: {
      "no-console": "off"
    }
  }
]
