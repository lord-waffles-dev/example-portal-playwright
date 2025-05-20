import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';

export interface CucumberWorldConstructorParams {
  parameters: Record<string, string>;
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle; // Represents Cucumber scenario information using the @cucumber/messages type
  context?: BrowserContext; // Playwright's BrowserContext for managing browser state
  page?: Page; // Playwright's Page object for interacting with web pages
  testName?: string;
  startTime?: Date;
  server?: APIRequestContext; // Playwright's APIRequestContext for making API requests
  username?: string;
  playwrightOptions?: PlaywrightTestOptions; // Configuration options for Playwright tests
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  debug = false;
}

setWorldConstructor(CustomWorld);
