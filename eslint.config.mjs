// eslint.config.mjs
import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    ignores: ["**/node_modules/**", ".next/**", "dist/**"],
  },

  {
    languageOptions: {
      parser: require.resolve("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["next/babel"], // عشان يفهم JSX + Next.js
        },
      },
      globals: {
        window: true,
        document: true,
        navigator: true,
        localStorage: true,
        sessionStorage: true,
        setTimeout: true,
        setInterval: true,
        clearInterval: true,
        scrollTo: true,
        URL: true,
      },
    },

    plugins: {
      "@next/next": nextPlugin,
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
