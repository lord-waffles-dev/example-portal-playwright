import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';
import { AuthResponse } from '../models/api/auth.model';
import { ConsultationResponse, VisitHistoryResponse } from '../models/api/consultation.model';

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
  authData?: AuthResponse; // For storing authentication data
  consultationData?: ConsultationResponse; // For storing consultation data
  visitHistory?: VisitHistoryResponse; // For storing visit history data
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  debug = false;
}

setWorldConstructor(CustomWorld);
