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
    emailInput: string;
    passwordInput: string;
    continueButton: string;
    forgotPasswordLink: string;
    // Two-Step Authentication Page
    mfa_1: string;
    mfa_2: string;
    mfa_3: string;
    mfa_4: string;
    mfa_5: string;
    mfa_6: string;
    resendButton: string;
    checkbox: string;
    mfa_continueButton: string;
    // Dashboard Page
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
      logo: 'xpath=//img[@alt=\'Recuro Health\']', // alt
      emailInput: 'id=login__email', // UID
      passwordInput: 'id=login__password', // UID
      continueButton: 'id=login__continue', // UID
      forgotPasswordLink: 'id=login__forgot-password', // UID
      // Two-Step Authentication Page
      mfa_1: 'xpath=(//input[@inputmode=\'numeric\'])[1]',
      mfa_2: 'xpath=(//input[@inputmode=\'numeric\'])[2]',
      mfa_3: 'xpath=(//input[@inputmode=\'numeric\'])[3]',
      mfa_4: 'xpath=(//input[@inputmode=\'numeric\'])[4]',
      mfa_5: 'xpath=(//input[@inputmode=\'numeric\'])[5]',
      mfa_6: 'xpath=(//input[@inputmode=\'numeric\'])[6]',
      resendButton: 'xpath=//button[normalize-space(text())=\'Resend\']',
      checkbox: 'xpath=//input[@type=\'checkbox\']',
      mfa_continueButton: 'id=mfa__continue',
      // Dashboard Page
      ...customSelectors
    };
  }

  /**
   * Navigate to the Provider Portal website.
   */
  async navigateToLogin(): Promise<void> {
    await this.navigateTo(config.NEW_PROVIDER_STAGING_URL);
    await this.waitForElement(this.selectors.logo);
  }

  /**
   * Input Email Address into the Email Input field.
   * @param email
   */
  async inputEmail(email: string): Promise<void> {
    await this.isVisible(this.selectors.emailInput);
    await this.fill(this.selectors.emailInput, email);
  }

  /**
   * Input Email Address into the Password Input field.
   * @param password
   */
  async inputPassword(password: string): Promise<void> {
    await this.isVisible(this.selectors.passwordInput);
    await this.fill(this.selectors.passwordInput, password);
  }

  /**
   * Click the Continue Button to proceed to the 2FA screen.
   */
  async clickContinue(): Promise<void> {
    await this.click(this.selectors.continueButton);
  }

  /**
   * Input 2FA Code into each input field.
   * This test is for Test Provider Accounts that have Bypassed MFA.
   */
  async inputMfa(): Promise<void> {
    await this.isVisible(this.selectors.mfa_1);
    await this.fill(this.selectors.mfa_1, '1');
    await this.fill(this.selectors.mfa_2, '2');
    await this.fill(this.selectors.mfa_3, '3');
    await this.fill(this.selectors.mfa_4, '4');
    await this.fill(this.selectors.mfa_5, '5');
    await this.fill(this.selectors.mfa_6, '6');
  }

  /**
   * Click the Continue Button to proceed to the Dashboard screen.
   */
  async clickContinueMfa(): Promise<void> {
    await this.click(this.selectors.mfa_continueButton);
  }

  /**
   * Verify Dashboard is present upon redirection from the 2FA screen.
   */
  async verifyDashboard(): Promise<void> {
    await this.waitForElement(this.selectors.logo); // update to dashboard element
  }
}
