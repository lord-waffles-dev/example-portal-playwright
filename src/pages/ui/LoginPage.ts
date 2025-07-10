import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { config } from '../../support/config';

/**
 * LoginPage class.
 * This class extends BasePage and provides specific functionality for the Provider Portal website.
 */
export class LoginPage extends BasePage {
  readonly page: Page;
  // Login Page
  readonly loginPage: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly passwordToggleButton: Locator;
  // Two-Step Authentication Page
  readonly mfa_1: Locator;
  readonly mfa_2: Locator;
  readonly mfa_3: Locator;
  readonly mfa_4: Locator;
  readonly mfa_5: Locator;
  readonly mfa_6: Locator;
  readonly resendButton: Locator;
  readonly checkbox: Locator;
  readonly mfaContinueButton: Locator;
  readonly mfaErrorMessage: Locator;

  /**
   * Constructor for the LoginPage class.
   * @param page - The Login Page object
   */
  constructor(page: Page) {
    super(page);
    this.page = page;
    // Login Page
    this.loginPage = page.locator('//img[@alt=\'Recuro Health\']');
    this.emailInput = page.locator('#login__email');
    this.passwordInput = page.locator('#login__password');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.forgotPasswordLink = page.locator('#m_login_forget_password');
    this.emailErrorMessage = page.locator('#login__email-helper-text');
    this.passwordErrorMessage = page.locator('#login__password-helper-text');
    this.passwordToggleButton = page.locator('button[aria-label="toggle password visibility."]');
    // Two-Step Authentication Page
    this.mfa_1 = page.locator('input[inputmode="numeric"]').nth(0);
    this.mfa_2 = page.locator('input[inputmode="numeric"]').nth(1);
    this.mfa_3 = page.locator('input[inputmode="numeric"]').nth(2);
    this.mfa_4 = page.locator('input[inputmode="numeric"]').nth(3);
    this.mfa_5 = page.locator('input[inputmode="numeric"]').nth(4);
    this.mfa_6 = page.locator('input[inputmode="numeric"]').nth(5);
    this.resendButton = page.getByRole('button', { name: 'Resend' });
    this.checkbox = page.locator('input[type="checkbox"]');
    this.mfaContinueButton = page.locator('#mfa__continue');
    this.mfaErrorMessage = page.locator('p:text("Incorrect verification code. Please try again.")');
  }

  /**
   * Navigate to the Provider Portal website.
   */
  async navigateToLogin(): Promise<void> {
    await this.navigateTo(config.environments.staging.newProviderUrl);
    await this.loginPage.waitFor();
  }

  /**
   * Input Email Address into the Email Input field.
   * @param email
   */
  async inputEmail(email: string): Promise<void> {
    try {
      await this.emailInput.waitFor({ state: 'visible' });
      await this.emailInput.fill(email);
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
      await this.passwordInput.waitFor({ state: 'visible' });
      await this.passwordInput.fill(password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to input password "${password}": ${errorMessage}`);
    }
  }

  /**
   * Click the Password Visibility Toggle Button to toggle password visibility.
   */
  async clickPasswordVisibilityToggle(): Promise<void> {
    try {
      await this.passwordToggleButton.click();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to click password visibility toggle button: ${errorMessage}`);
    }
  }

  /**
   * Verify that the password message is displayed and matches the expected text.
   * @param expectedText - The expected error message text
   * @returns True if the password is unmasked and matches the expected text, false otherwise
   */
  async verifyPasswordVisible(expectedText?: string): Promise<boolean> {
    // Get the actual text from the error message element
    const actualText = await this.passwordInput.inputValue();

    // If expectedText is provided, verify that it matches the actual text
    if (expectedText) {
      if (actualText !== expectedText) {
        throw new Error(`Password text does not match. Expected: "${expectedText}", Actual: "${actualText}"`);
      }
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return (actualText ?? '').trim() !== '';
  }

  /**
   * Verify that the password message is masked and does not display the expected text.
   * @param expectedText - The expected error message text
   * @returns True if the password is masked and matches the expected text, false otherwise
   */
  async verifyPasswordMasked(expectedText?: string): Promise<boolean> {
    // Get the actual text from the error message element
    const actualText = await this.passwordInput.inputValue();

    // If expectedText is provided, verify that it matches the actual text
    if (expectedText) {
      if (actualText == expectedText) {
        throw new Error(`Password text is not masked. Expected: "${expectedText}", Actual: "${actualText}"`);
      }
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return (actualText ?? '').trim() !== '';
  }

  /**
   * Click the Continue Button to proceed to the 2FA screen.
   */
  async clickContinue(): Promise<void> {
    try {
      await this.continueButton.click();
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
    await this.mfa_1.waitFor({ state: 'visible' });

    const mfaInputs = [this.mfa_1, this.mfa_2, this.mfa_3, this.mfa_4, this.mfa_5, this.mfa_6];

    for (let i = 0; i < 6; i++) {
      await mfaInputs[i].fill(String(i + 1));
      if (await mfaInputs[i].inputValue() !== String(i + 1)) {
        throw new Error(`MFA validation failed at position ${i + 1}`);
      }
    }
  }

  /**
   * Click the Continue Button to proceed to the Dashboard screen.
   */
  async clickContinueMfa(): Promise<void> {
    await this.mfaContinueButton.click();
  }

  async verifyEmailError(expectedText?: string): Promise<boolean> {
    await this.emailErrorMessage.waitFor({ state: 'visible' });
    const actualText = await this.emailErrorMessage.textContent() ?? '';
    if (expectedText) {
      await expect(this.emailErrorMessage).toHaveText(expectedText);
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return actualText.trim() !== '';
  }

  async verifyPasswordError(expectedText?: string): Promise<boolean> {
    await this.passwordErrorMessage.waitFor({ state: 'visible' });
    const actualText = await this.passwordErrorMessage.textContent() ?? '';
    if (expectedText) {
      await expect(this.passwordErrorMessage).toHaveText(expectedText);
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return actualText.trim() !== '';
  }

  /**
   * Verify that the 2FA error message is displayed and matches the expected text.
   * @param expectedText - The expected error message text
   * @returns True if the 2FA error message is displayed and matches the expected text, false otherwise
   */
  async verify2FAError(expectedText?: string): Promise<boolean> {
    await this.mfaErrorMessage.waitFor();

    // Get the actual text from the error message element
    const actualText = await this.mfaErrorMessage.textContent() ?? '';

    // If expectedText is provided, verify that it matches the actual text
    if (expectedText) {
      if (actualText !== expectedText) {
        throw new Error(`2FA error message text does not match. Expected: "${expectedText}", Actual: "${actualText}"`);
      }
      return true;
    }

    // If no expectedText is provided, verify that the actual text is not empty
    return actualText.trim() !== '';
  }
}
