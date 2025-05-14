import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * FormPage class that represents a form page.
 * This class extends BasePage and provides specific functionality for handling forms.
 * This is a more complex example page object that demonstrates how to handle forms.
 */
export class FormPage extends BasePage {
  private readonly selectors: {
    form: string;
    nameInput: string;
    emailInput: string;
    passwordInput: string;
    confirmPasswordInput: string;
    submitButton: string;
    errorMessage: string;
    successMessage: string;
  };

  /**
   * Constructor for the FormPage class.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      form: 'form',
      nameInput: 'input[name="name"]',
      emailInput: 'input[name="email"]',
      passwordInput: 'input[name="password"]',
      confirmPasswordInput: 'input[name="confirmPassword"]',
      submitButton: 'button[type="submit"]',
      errorMessage: '.error-message',
      successMessage: '.success-message',
      ...customSelectors
    };
  }

  /**
   * Navigate to the form page.
   * @param url - The URL of the form page
   */
  async navigateToFormPage(url: string): Promise<void> {
    await this.navigateTo(url);
    await this.waitForElement(this.selectors.form);
  }

  /**
   * Fill the form with the provided data.
   * @param name - The name to fill in
   * @param email - The email to fill in
   * @param password - The password to fill in
   * @param confirmPassword - The confirm password to fill in
   */
  async fillForm(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fill(this.selectors.nameInput, name);
    await this.fill(this.selectors.emailInput, email);
    await this.fill(this.selectors.passwordInput, password);
    await this.fill(this.selectors.confirmPasswordInput, confirmPassword);
  }

  /**
   * Submit the form.
   */
  async submitForm(): Promise<void> {
    await this.click(this.selectors.submitButton);
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
    return await this.getText(this.selectors.errorMessage);
  }

  /**
   * Get the success message.
   * @returns The success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.selectors.successMessage);
  }

  /**
   * Check if the form submission was successful.
   * @returns True if the form submission was successful, false otherwise
   */
  async isFormSubmissionSuccessful(): Promise<boolean> {
    return await this.isVisible(this.selectors.successMessage);
  }

  /**
   * Check if the form submission failed.
   * @returns True if the form submission failed, false otherwise
   */
  async isFormSubmissionFailed(): Promise<boolean> {
    return await this.isVisible(this.selectors.errorMessage);
  }

  /**
   * Wait for the form submission to complete.
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForFormSubmission(timeout?: number): Promise<void> {
    await Promise.race([
      this.waitForElement(this.selectors.successMessage, timeout),
      this.waitForElement(this.selectors.errorMessage, timeout)
    ]);
  }
}
