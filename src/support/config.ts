import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true
  }
};

export const viewports = [
  { width: 1920, height: 1080, name: 'desktop' },
  { width: 1512, height: 900, name: 'laptop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 375, height: 667, name: 'mobile' }
];

export const config = {
  browser: process.env.BROWSER ?? 'chromium',
  browserOptions,
  EXAMPLE_URL: 'https://playwright.dev',
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: 'https://catfact.ninja/',
  environments: {
    staging: {
      providerUrl: 'https://staging.recurohealth.com/',
      newProviderUrl: 'https://provider-new-staging.recurohealth.com/'
    },
    production: {
      providerUrl: 'https://provider.recurohealth.com/',
      newProviderUrl: 'https://provider-new.recurohealth.com/'
    }
  },
  credentials: {
    staging: {
      validProvider1: {
        email: 'qa-auto+eprescribe@recurohealth.com',
        password: 'RecuroTest1!'
      },
      invalidProvider2: {
        email: 'notanemail@email',
        password: 'notapassword'
      },
      autoProvider1: {
        // Provider w/ ePrescribe
        // Timezone: Central
        // Name: Auto1 Provider
        email: 'qa-auto+eprescribe@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider2: {
        // Provider w/o ePrescribe
        // Timezone: Mountain Time (USMT)
        // Name: Auto2 Provider
        email: 'qa-auto+no-eprescribe@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider3: {
        // Provider w/o licenses
        // Timezone: Eastern
        // Name: Auto3 Provider
        email: 'qa-auto+no-licenses@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider4: {
        // Provider w/ single state license
        // Timezone: Central
        // State: Texas
        // Name: Auto4 Provider
        email: 'qa-auto+one-state@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider5: {
        // Provider w/ all state licenses
        // Timezone: Pacific
        // Name: Auto5 Provider
        email: 'qa-auto+all-states@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider6: {
        // Provider w/ Grail
        // Timezone: Central
        // Name: Auto6 Provider
        email: 'qa-auto+grail@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider7: {
        // Provider w/ Cologuard
        // Timezone: Central
        // Name: Auto7 Provider
        email: 'qa-auto+cologuard@recurohealth.com',
        password: 'RecuroTest1!'
      },
      autoProvider8: {
        // Provider w/ Grail, Cologuard, and ePrescribe
        // Timezone: Pacific
        // Name: Auto8 Provider
        email: 'qa-auto+labs@recurohealth.com',
        password: 'RecuroTest1!'
      }
    },
    production: {
      // Production credentials
    }
  }
};
