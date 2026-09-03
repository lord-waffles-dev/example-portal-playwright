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
  BASE_API_URL: process.env.BASE_API_URL ?? 'https://qa-practice.razvanvancea.ro/',
  VISIT_API_URL: process.env.VISIT_API_URL ?? 'https://qa-practice.razvanvancea.ro/',
  targets: {
    qaPractice: {
      baseUrl: process.env.BASE_URL ?? 'https://qa-practice.razvanvancea.ro/'
    }
  },
  consultType: {
    general_medical: '1',
    therapy_consult: '1099',
    psychiatry_follow: '1102',
    psychiatry_initial: '1111',
    vpc_initial: '1123',
    vpc_follow: '1126'
  },
  consultStatus: {
    scheduled: '1',
    ongoing: '2',
    completed: '3',
    cancelled: '4',
    assigned: '7',
    error: '8',
    closed: '9',
    serviced: '10',
    ongoing_first_missed_call: '11',
    ongoing_second_missed_call: '12',
    ongoing_third_missed_call: '13',
    pending_provider_confirmation: '14'
  },
  mediaType: {
    phone: '1',
    video: '2'
  },
  environments: {
    staging: {
      providerUrl: process.env.EXAMPLE_PROVIDER_URL ?? 'https://example-provider.test/',
      newProviderUrl: process.env.EXAMPLE_NEW_PROVIDER_URL ?? 'https://example-new-provider.test/'
    }
  },
  credentials: {
    staging: {
      validProvider1: {
        email: 'qa-auto+valid-provider@example.test',
        password: 'ExampleTest1!',
        providerID: '1000001'
      },
      invalidProvider2: {
        email: 'notanemail@email',
        password: 'notapassword'
      },
      no2FAProvider: {
        email: 'qa-auto+no-2fa@example.test',
        password: 'ExampleTest1!',
        providerID: '1000009'
      },
      autoProvider1: {
        email: 'qa-auto+provider1@example.test',
        password: 'ExampleTest1!',
        providerID: '1000001'
      },
      autoProvider2: {
        email: 'qa-auto+provider2@example.test',
        password: 'ExampleTest1!',
        providerID: '1000002'
      },
      autoProvider3: {
        email: 'qa-auto+provider3@example.test',
        password: 'ExampleTest1!',
        providerID: '1000003'
      },
      autoProvider4: {
        email: 'qa-auto+provider4@example.test',
        password: 'ExampleTest1!',
        providerID: '1000004'
      },
      autoProvider5: {
        email: 'qa-auto+provider5@example.test',
        password: 'ExampleTest1!',
        providerID: '1000005'
      },
      autoProvider6: {
        email: 'qa-auto+provider6@example.test',
        password: 'ExampleTest1!',
        providerID: '1000006'
      },
      autoProvider7: {
        email: 'qa-auto+provider7@example.test',
        password: 'ExampleTest1!',
        providerID: '1000007'
      },
      autoProvider8: {
        email: 'qa-auto+provider8@example.test',
        password: 'ExampleTest1!',
        providerID: '1000008'
      },
      autoMember1: {
        email: 'qa-auto+member1@example.test',
        password: 'ExampleTest1!',
        memberID: '2000001'
      },
      autoMember2: {
        email: 'qa-auto+member2@example.test',
        password: 'ExampleTest1!',
        memberID: '2000002'
      }
    }
  }
};
