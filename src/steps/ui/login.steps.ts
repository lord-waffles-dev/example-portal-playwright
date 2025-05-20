import { ICustomWorld } from '../../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../../pages';
import { config } from '../../support/config';

/**
 * Step definitions for the Provider Portal Login tests.
 * These steps use the LoginPage page object to interact with the website.
 */

Given('provider navigates to the provider portal', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.navigateToLogin();
});

When('they enter a valid email', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputEmail(config.STAGING_PROVIDER_1_EMAIL);
});

When('they enter an invalid email', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputEmail(config.STAGING_PROVIDER_1_EMAIL_INVALID);
});

When('they enter a valid password', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputPassword(config.STAGING_PROVIDER_1_PASSWORD);
});

When('they enter an invalid password', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputPassword(config.STAGING_PROVIDER_1_PASSWORD_INVALID);
});

When('they select login continue button', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.clickContinue();
});

When('they enter a valid 2fa code', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputMfa();
});

When('they select 2fa continue button', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.clickContinueMfa();
});

When('they should observe an email error message', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  // Expecting Text
  await LoginPage.verifyEmailError('Please enter a valid email address');
  // Verifying Presence
  await LoginPage.verifyEmailError();
});

When('they should observe an password error message', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  // Expecting Text
  await LoginPage.verifyPasswordError('Incorrect email or password');
  // Verifying Presence
  await LoginPage.verifyPasswordError();
});

Then('they should be logged in successfully', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.verifyDashboard();
});
