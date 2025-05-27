import { ICustomWorld } from '../../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../../pages';
import { config } from '../../support/config';

/**
 * Step definitions for the Provider Portal Login tests.
 * These steps use the LoginPage page object to interact with the website.
 */

type ProviderKey = 'validProvider1' | 'invalidProvider2' | 'autoProvider1' | 'autoProvider2' |
  'autoProvider3' | 'autoProvider4' | 'autoProvider5' | 'autoProvider6' |
  'autoProvider7' | 'autoProvider8';

Given('provider navigates to the provider portal', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.navigateToLogin();
});

/**
 * Comprehensive login step that handles the entire login flow
 * Including navigation, email/password entry, and 2FA
 */
Given('I log into the provider portal with {string}', async function (this: ICustomWorld, provider: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  const DashboardPage = PageFactory.getDashboardPage(page);

  // Navigate to log in if needed (check if we're already on the login page)
  const currentUrl = page.url();
  if (!currentUrl.includes('login') && !currentUrl.includes('auth')) {
    await LoginPage.navigateToLogin();
  }

  // Complete the login process
  await LoginPage.inputEmail(config.credentials.staging[provider as ProviderKey].email);
  await LoginPage.inputPassword(config.credentials.staging[provider as ProviderKey].password);
  await LoginPage.clickContinue();
  await LoginPage.inputMfa();
  await LoginPage.clickContinueMfa();

  // Verify login was successful
  await DashboardPage.verifyDashboard();
});

When('they enter a valid email with {string}', async function (this: ICustomWorld, email: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputEmail(config.credentials.staging[email as ProviderKey].email);
});

When('they enter an invalid email with {string}', async function (this: ICustomWorld, email: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputEmail(email);
});

When('they enter an invalid email format with {string}', async function (this: ICustomWorld, email: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputEmail(email);
});

When('they enter a valid password with {string}', async function (this: ICustomWorld, password: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputPassword(config.credentials.staging[password as ProviderKey].password);
});

When('they enter an invalid password', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputPassword(config.credentials.staging.invalidProvider2.password);
});

When('they click the login continue button', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.clickContinue();
});

When('they click the password visibility toggle', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.clickPasswordVisibilityToggle();
});

Then('the password should be visible as {string}', async function (this: ICustomWorld, password: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  // Expecting Text
  await LoginPage.verifyPasswordVisible(password);
});

Then('the password {string} should be masked', async function (this: ICustomWorld, password: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.verifyPasswordMasked(password);
});

When('they enter a valid 2FA code', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputMfa();
});

When('they enter an invalid 2FA code', async function (this: ICustomWorld) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  await LoginPage.inputMfa(); // no need to change as 2FA won't match 123456
});

When('they click the 2FA continue button', async function (this: ICustomWorld) {
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

Then('they should be successfully logged in to the dashboard', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyDashboard();
});

Then('they should see an email error message {string}', async function (this: ICustomWorld, message: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  // Expecting Text
  await LoginPage.verifyEmailError(message);
  // Verifying Presence
  await LoginPage.verifyEmailError();
});

Then('they should see a password error message {string}', async function (this: ICustomWorld, message: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  // Expecting Text
  await LoginPage.verifyPasswordError(message);
  // Verifying Presence
  await LoginPage.verifyPasswordError();
});

Then('they should see a 2FA error message {string}', async function (this: ICustomWorld, message: string) {
  const page = this.page!;
  const LoginPage = PageFactory.getLoginPage(page);
  // Expecting Text
  await LoginPage.verify2FAError(message);
  // Verifying Presence
  await LoginPage.verify2FAError();
});
