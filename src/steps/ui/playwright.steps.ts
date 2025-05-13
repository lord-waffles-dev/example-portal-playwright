import { ICustomWorld } from '../../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PageFactory } from '../../pages';

/**
 * Step definitions for the Playwright website tests.
 * These steps use the PlaywrightPage page object to interact with the website.
 */

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const page = this.page!;
  const playwrightPage = PageFactory.getPlaywrightPage(page);
  await playwrightPage.navigateToPlaywrightDocs();
});

When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const playwrightPage = PageFactory.getPlaywrightPage(page);
  await playwrightPage.changeTheme(mode);
});

Then('We see {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const playwrightPage = PageFactory.getPlaywrightPage(page);
  const isCorrectMode = await playwrightPage.isThemeMode(mode);
  expect(isCorrectMode).toBeTruthy();
});
