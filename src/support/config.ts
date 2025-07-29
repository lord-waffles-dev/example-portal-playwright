import { LaunchOptions } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

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
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: 'https://staging-platform.wellviasolutions.com/',
  VISIT_API_URL: 'https://visit-api-staging.recurohealth.cloud/',
  consultType: {
    general_medical: '1',
    therapy_consult: '1099',
    psychiatry_follow: '1102',
    psychiatry_initial: '1111',
    vpc_initial: '1123',
    vpc_follow: '1126'
  },
  mediaType: {
    phone: '1',
    video: '2'
  },
  environments: {
    staging: {
      providerUrl: 'https://staging.recurohealth.com/',
      newProviderUrl: 'https://provider-new-staging.recurohealth.com'
    }
  },
  staging_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il9xcUdLU0cwN25xbTdSQUpUZUVJOSJ9.eyJodHRwczovL3dlbGx2aWFzb2x1dGlvbnMuY29tL2NsYWltcy9tZXRhIjp7InVpZCI6IjMyNDEyNTY4IiwidXR5cCI6ImFnZW50IiwiaXdhIjp0cnVlfSwiaXNzIjoiaHR0cHM6Ly9vaWRjLndlbGx2aWFzb2x1dGlvbnMuY29tLyIsInN1YiI6ImF1dGgwfDMyNDEyNTY4LnByb2R1Y3Rpb24iLCJhdWQiOlsiaHR0cHM6Ly9zdGFnaW5nLXBsYXRmb3JtLndlbGx2aWFzb2x1dGlvbnMuY29tLyIsImh0dHBzOi8vd2VsbHZpYS1vaWRjLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NTMzNjY0OTgsImV4cCI6MTc1NTk1ODQ5OCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhZGRyZXNzIHBob25lIiwiZ3R5IjoicGFzc3dvcmQiLCJhenAiOiJlMm41NDN5NWJSbUhlRnZJTUp6MVZUVTIxSkxRQmZIaCIsInBlcm1pc3Npb25zIjpbXX0.XrgL6U7Ga0hbuftO9BCsn_XDt6mq30itbSwcHh4z094DiIEzWl4silbQOms4cSLOfGTkTpfjm0fEjaOFHuIEcbE-4HsrqGy9dIbuFCt6KiiibpldGzJa1FDezNN-x9m2cxHsnJT2wyLrMie70yMWku2OEMjfznMGXAprjj3Q1uWo2gzGA46whwzHaXA5ST9uDFOxHciGgMmDNILg3mvTt1D_gEygk4e68NhIq96XVY0vxBlVQXYMmozdQ6xSr7CIJCwwQX6XbFmbPShtPMiHGNWNHrOQSxWev1Cu5Z2x17a7iQ6FOW_KPoK18vDoTWqak5cTmtreEbpWR-9KjzM4zw',
  credentials: {
    staging: {
      validProvider1: {
        email: 'qa-auto+eprescribe@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: '4161224'
      },
      invalidProvider2: {
        email: 'notanemail@email',
        password: 'notapassword'
      },
      no2FAProvider: {
        // Name: Auto9 Provider
        // Account 2FA is not bypassed in staging
        email: 'qa-auto+no-2fa@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider1: {
        // Provider w/ ePrescribe
        // Timezone: Central
        // Name: Auto1 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+eprescribe@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: '4161224'
      },
      autoProvider2: {
        // Provider w/o ePrescribe
        // Timezone: Mountain Time (USMT)
        // Name: Auto2 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+no-eprescribe@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider3: {
        // Provider w/o licenses
        // Timezone: Eastern
        // Name: Auto3 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+no-licenses@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider4: {
        // Provider w/ single state license
        // Timezone: Central
        // State: Texas
        // Name: Auto4 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+one-state@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider5: {
        // Provider w/ all state licenses
        // Timezone: Pacific
        // Name: Auto5 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+all-states@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider6: {
        // Provider w/ Grail
        // Timezone: Central
        // Name: Auto6 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+grail@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider7: {
        // Provider w/ Cologuard
        // Timezone: Central
        // Name: Auto7 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+cologuard@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoProvider8: {
        // Provider w/ Grail, Cologuard, and ePrescribe
        // Timezone: Pacific
        // Name: Auto8 Provider
        // Account 2FA bypassed in staging
        email: 'qa-auto+labs@recurohealth.com',
        password: 'RecuroTest1!',
        providerID: ''
      },
      autoMember1: {
        // Client: Recuro Demo | Group: Recuro Sales Group
        // Timezone: Central
        // Name: Auto1 Member
        email: 'qa-auto+member1@recurohealth.com',
        password: 'RecuroTest1!',
        memberID: '271658634'
      },
      autoMember2: {
        // Client: ... | Group: ...
        // Timezone: Central
        // Name: Auto2 Member
        email: 'qa-auto+member2@recurohealth.com',
        password: 'RecuroTest1!',
        memberID: ''
      }
    }
  }
};
