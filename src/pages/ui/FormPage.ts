import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * FormPage class that represents a form page.
 * This class extends BasePage and provides specific functionality for handling forms.
 * This is a more complex example page object that demonstrates how to handle forms.
 */
export class FormPage extends BasePage {
  // Selectors for form elements
  private readonly formSelector = 'form';
  private readonly nameInputSelector = 'input[name="name"]';
  private readonly emailInputSelector = 'input[name="email"]';
  private readonly passwordInputSelector = 'input[name="password"]';
  private readonly confirmPasswordInputSelector = 'input[name="confirmPassword"]';
  private readonly submitButtonSelector = 'button[type="submit"]';
  private readonly errorMessageSelector = '.error-message';
  private readonly successMessageSelector = '.success-message';

  /**
   * Constructor for the FormPage class.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the form page.
   * @param url - The URL of the form page
   */
  async navigateToFormPage(url: string): Promise<void> {
    await this.navigateTo(url);
    await this.waitForElement(this.formSelector);
  }

  /**
   * Fill the form with the provided data.
   * @param name - The name to fill in
   * @param email - The email to fill in
   * @param password - The password to fill in
   * @param confirmPassword - The confirm password to fill in
   */
  async fillForm(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fill(this.nameInputSelector, name);
    await this.fill(this.emailInputSelector, email);
    await this.fill(this.passwordInputSelector, password);
    await this.fill(this.confirmPasswordInputSelector, confirmPassword);
  }

  /**
   * Submit the form.
   */
  async submitForm(): Promise<void> {
    await this.click(this.submitButtonSelector);
  }

  /**
   * Fill and submit the form with the provided data.
   * @param name - The name to fill in
   * @param email - The email to fill in
   * @param password - The password to fill in
   * @param confirmPassword - The confirm password to fill in
   */
  async fillAndSubmitForm(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fillForm(name, email, password, confirmPassword);
    await this.submitForm();
  }

  /**
   * Get the error message.
   * @returns The error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessageSelector);
  }

  /**
   * Get the success message.
   * @returns The success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessageSelector);
  }

  /**
   * Check if the form submission was successful.
   * @returns True if the form submission was successful, false otherwise
   */
  async isFormSubmissionSuccessful(): Promise<boolean> {
    return await this.isVisible(this.successMessageSelector);
  }

  /**
   * Check if the form submission failed.
   * @returns True if the form submission failed, false otherwise
   */
  async isFormSubmissionFailed(): Promise<boolean> {
    return await this.isVisible(this.errorMessageSelector);
  }

  /**
   * Wait for the form submission to complete.
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForFormSubmission(timeout?: number): Promise<void> {
    await Promise.race([
      this.waitForElement(this.successMessageSelector, timeout),
      this.waitForElement(this.errorMessageSelector, timeout)
    ]);
  }
}
