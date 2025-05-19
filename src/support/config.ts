import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true
  }
};

export const config = {
  browser: process.env.BROWSER ?? 'chromium',
  browserOptions,
  EXAMPLE_URL: 'https://playwright.dev',
  LEGACY_PROVIDER_PROD_URL: 'https://provider.recurohealth.com/',
  NEW_PROVIDER_PROD_URL: 'https://provider-new.recurohealth.com/',
  NEW_PROVIDER_STAGING_URL: 'https://provider-new-staging.recurohealth.com/',
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: 'https://catfact.ninja/',
  STAGING_PROVIDER_1_EMAIL: 'staging.provider+nolabs-nobh@recurohealth.com',
  STAGING_PROVIDER_1_PASSWORD: 'RecuroStaging1!'
};
