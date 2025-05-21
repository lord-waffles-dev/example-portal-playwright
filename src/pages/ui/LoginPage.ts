import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { config } from '../../support/config';

/**
 * LoginPage class.
 * This class extends BasePage and provides specific functionality for the Provider Portal website.
 */
export class LoginPage extends BasePage {
  private readonly selectors: {
    // Login Page
    logo: string;
    loginToYourAccount: string;
    emailInput: string;
    passwordInput: string;
    continueButton: string;
    forgotPasswordLink: string;
    emailErrorMessage: string;
    passwordErrorMessage: string;
    // Two-Step Authentication Page
    mfa_1: string;
    mfa_2: string;
    mfa_3: string;
    mfa_4: string;
    mfa_5: string;
    mfa_6: string;
    resendButton: string;
    checkbox: string;
    mfaContinueButton: string;
  };

  /**
   * Constructor for the LoginPage class.
   * @param page - The Login Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      // Login Page
      logo: 'xpath=//img[@alt=\'Recuro Health\']',
      loginToYourAccount: 'xpath=//h1[normalize-space(text())=\'Login to your account\']',
      emailInput: 'id=login__email',
      passwordInput: 'id=login__password',
      continueButton: 'id=login__continue',
      forgotPasswordLink: 'id=login__forgot-password',
      emailErrorMessage: 'id=login__email-helper-text',
      passwordErrorMessage: 'id=login__email-helper-text', // same message
      // Two-Step Authentication Page
      mfa_1: 'xpath=(//input[@inputmode=\'numeric\'])[1]',
      mfa_2: 'xpath=(//input[@inputmode=\'numeric\'])[2]',
      mfa_3: 'xpath=(//input[@inputmode=\'numeric\'])[3]',
      mfa_4: 'xpath=(//input[@inputmode=\'numeric\'])[4]',
      mfa_5: 'xpath=(//input[@inputmode=\'numeric\'])[5]',
      mfa_6: 'xpath=(//input[@inputmode=\'numeric\'])[6]',
      resendButton: 'xpath=//button[normalize-space(text())=\'Resend\']',
      checkbox: 'xpath=//input[@type=\'checkbox\']',
      mfaContinueButton: 'id=mfa__continue',
      ...customSelectors
    };
  }

  /**
   * Navigate to the Provider Portal website.
   */
  async navigateToLogin(): Promise<void> {
    await this.navigateTo(config.environments.staging.newProviderUrl);
    await this.waitForElement(this.selectors.logo);
  }

  /**
   * Input Email Address into the Email Input field.
   * @param email
   */
  async inputEmail(email: string): Promise<void> {
    try {
      await this.isVisible(this.selectors.emailInput);
      await this.fill(this.selectors.emailInput, email);
      await this.click(this.selectors.loginToYourAccount);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to input email "${email}": ${errorMessage}`);
    }
  }

  /**
   * Input Password into the Password Input field.
   * @param password
   */
  async inputPassword(password: string): Promise<void> {
    try {
      await this.isVisible(this.selectors.passwordInput);
      await this.fill(this.selectors.passwordInput, password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to input password "${password}": ${errorMessage}`);
    }
  }

  /**
   * Click the Continue Button to proceed to the 2FA screen.
   */
  async clickContinue(): Promise<void> {
    try {
      await this.click(this.selectors.continueButton);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to click continue button: ${errorMessage}`);
    }
  }

  /**
   * Input 2FA Code into each input field.
   * This test is for Test Provider Accounts that have Bypassed MFA.
   */
  async inputMfa(): Promise<void> {
    await this.isVisible(this.selectors.mfa_1);

    for (let i = 1; i <= 6; i++) {
      const selector = this.selectors[`mfa_${i}` as keyof typeof this.selectors];
      await this.fill(selector, String(i));
      if (await this.page.locator(selector).inputValue() !== String(i)) {
        throw new Error(`MFA validation failed at position ${i}`);
      }
    }
  }

  /**
   * Click the Continue Button to proceed to the Dashboard screen.
   */
  async clickContinueMfa(): Promise<void> {
    await this.click(this.selectors.mfaContinueButton);
  }

  /**
   * Verify that the email error message is displayed and matches the expected text.
   * @param expectedText - The expected error message text
   * @returns True if the email error message is displayed and matches the expected text, false otherwise
   */
  async verifyEmailError(expectedText?: string): Promise<boolean> {
    await this.waitForElement(this.selectors.emailErrorMessage);

    // Get the actual text from the error message element
    const actualText = await this.getText(this.selectors.emailErrorMessage);

    // If expectedText is provided, verify that it matches the actual text
    if (expectedText) {
      if (actualText !== expectedText) {
        throw new Error(`Email error message text does not match. Expected: "${expectedText}", Actual: "${actualText}"`);
      }
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return actualText.trim() !== '';
  }

  /**
   * Verify that the password error message is displayed and matches the expected text.
   * @param expectedText - The expected error message text
   * @returns True if the email error message is displayed and matches the expected text, false otherwise
   */
  async verifyPasswordError(expectedText?: string): Promise<boolean> {
    await this.waitForElement(this.selectors.passwordErrorMessage);

    // Get the actual text from the error message element
    const actualText = await this.getText(this.selectors.passwordErrorMessage);

    // If expectedText is provided, verify that it matches the actual text
    if (expectedText) {
      if (actualText !== expectedText) {
        throw new Error(`Email error message text does not match. Expected: "${expectedText}", Actual: "${actualText}"`);
      }
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return actualText.trim() !== '';
  }
}
