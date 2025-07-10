import { defineConfig } from '@playwright/test';
export default defineConfig({
  // Only use this testMatch when running Playwright directly, not with Cucumber
  testMatch: process.env.PLAYWRIGHT_TEST_MATCH ? 'tests/playwright/exploratory.test.ts' : '',
  use: {
    headless: false
  }
});
