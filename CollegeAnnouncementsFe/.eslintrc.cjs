module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  plugins: ["react", "@typescript-eslint", "security", "import"],
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:security/recommended-legacy",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],

  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],

    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],
    "no-console": "off",
    "no-nested-ternary": "off",
    "prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-plusplus": "off",
    "arrow-body-style": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "security/detect-object-injection": "off",
    "security/detect-unsafe-regex": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
};
