import { defineConfig } from "@playwright/test";
export default defineConfig({
  testMatch: "**/exploratory.ts",
  use: {
    headless: false,
  },
});
