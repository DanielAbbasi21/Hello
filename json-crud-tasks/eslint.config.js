import js from "@eslint/js"
import globals from "globals"
import json from "@eslint/json"
import { defineConfig } from "eslint/config"

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.node, ...globals.mocha }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      semi: ['error', 'never'],
      indent: ['error', 2]
    }
  },
  { 
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"] 
  },
])


