import { Page } from '@playwright/test';

/**
 * BasePage class that provides common functionality for all page objects.
 * This class should be extended by all page objects.
 */
export class BasePage {
  /**
   * Constructor for the BasePage class.
   * @param page - The Playwright Page object
   */
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a specific URL.
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for an element to be visible.
   * @param selector - The selector for the element
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Click on an element.
   * @param selector - The selector for the element
   */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Fill a form field.
   * @param selector - The selector for the form field
   * @param value - The value to fill in
   */
  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Get text from an element.
   * @param selector - The selector for the element
   * @returns The text content of the element
   */
  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() ?? '';
  }

  /**
   * Check if an element is visible.
   * @param selector - The selector for the element
   * @returns True if the element is visible, false otherwise
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Get an attribute value from an element.
   * @param selector - The selector for the element
   * @param attributeName - The name of the attribute
   * @returns The value of the attribute
   */
  async getAttribute(selector: string, attributeName: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attributeName);
  }
}
