import { ICustomWorld } from './custom-world';
import { config, viewports } from './config';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request,
  Browser
} from '@playwright/test';
import { ensureDir } from 'fs-extra';
import { setupNetworkCapture } from '../utils/networkCapture';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser | Browser;
const tracesDir = 'traces';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser | Browser;
}

// Configure the default timeout for all Cucumber steps.
// The timeout value is dynamically set based on the PWDEBUG environment variable.
// - If PWDEBUG is set (e.g., `PWDEBUG=1`), debugging mode is enabled by setting the timeout to -1.
//   This disables timeouts entirely, allowing operations to run indefinitely during debugging.
// - If PWDEBUG is not set, the timeout is set to 60 seconds (60,000 ms).
//   This ensures that steps have a limit to prevent potential hangs during test execution.
setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    case 'msedge':
      browser = await chromium.launch({ ...config.browserOptions, channel: 'msedge' });
      break;
    case 'chrome':
      browser = await chromium.launch({ ...config.browserOptions, channel: 'chrome' });
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  await ensureDir(tracesDir);
});

Before({ tags: '@ignore' }, function () {
  return 'skipped';
});

Before({ tags: '@debug' }, function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)

  const getViewport = () => {
    if (!process.env.VIEWPORT) {
      return viewports[0]; // Default to desktop if not specified
    }

    const matchedViewport = viewports.find(v => v.name === process.env.VIEWPORT);
    return matchedViewport ?? viewports[0];
  };

  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: getViewport()
  });
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.BASE_API_URL
  });

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });
  this.page = await this.context.newPage();

  await setupNetworkCapture(this.page);

  this.page.on('console', (msg: ConsoleMessage) => {
    // Capture all console messages
    const messageType = msg.type();
    const messageText = `[${messageType}] ${msg.text()}`;
    // Handling for errors
    if (messageType === 'error') {
      this.attach(`CONSOLE ERROR: ${messageText}`, 'text/plain');
    }
  });
  this.page.on('pageerror', (error) => {
    // Capture all page error messages
    this.attach(`PAGE ERROR: ${error.message}`, 'text/plain');
  });
  // Capture HTTP error responses (4xx, 5xx)
  this.page.on('response', (response) => {
    const status = response.status();
    if (status >= 400) {
      const requestUrl = response.url();
      this.attach(`HTTP ERROR: ${requestUrl} - Status ${status}`, 'text/plain');
    }
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }) {
  if (result) {
    this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      this.attach(`Taking screenshot for a failed test...`, 'text/plain');
      const image = await this.page?.screenshot();

      // Replace: with _ because colons aren't allowed in Windows paths
      const timePart = this.startTime?.toISOString().split('.')[0].replaceAll(':', '_');

      if (image) {
        this.attach(`Screenshot captured successfully`, 'text/plain');
        this.attach(image, 'image/png');
      } else {
        this.attach(`Screenshot failed to capture`, 'text/plain');
      }
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${timePart}trace.zip`
      });
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
