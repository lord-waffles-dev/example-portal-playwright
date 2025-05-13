import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { config } from '../../support/config';

/**
 * PlaywrightPage class that represents the Playwright documentation website.
 * This class extends BasePage and provides specific functionality for the Playwright website.
 */
export class PlaywrightPage extends BasePage {
  // Selectors for elements on the page
  // private readonly navbarSelector = 'nav';
  private readonly logoSelector = 'nav >> a >> text="Playwright"';
  private readonly themeToggleSelector = 'nav >> button[title*="dark and light mode"]';
  private readonly htmlSelector = 'html';

  /**
   * Constructor for the PlaywrightPage class.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the Playwright documentation website.
   */
  async navigateToPlaywrightDocs(): Promise<void> {
    await this.navigateTo(config.BASE_URL);
    await this.waitForElement(this.logoSelector);
  }

  /**
   * Get the current theme.
   * @returns The current theme ('light' or 'dark')
   */
  async getCurrentTheme(): Promise<string> {
    return (await this.getAttribute(this.htmlSelector, 'data-theme')) ?? '';
  }

  /**
   * Change the theme to the specified mode.
   * @param mode - The theme mode ('light' or 'dark')
   */
  async changeTheme(mode: string): Promise<void> {
    const currentTheme = await this.getCurrentTheme();
    // Only click the toggle if the current theme is different from the desired theme
    if (currentTheme !== mode) {
      await this.click(this.themeToggleSelector);
    }
    // Wait for the theme to change
    await this.page.locator(`${this.htmlSelector}[data-theme=${mode}]`).waitFor();
  }

  /**
   * Check if the current theme matches the specified mode.
   * @param mode - The theme mode to check ('light' or 'dark')
   * @returns True if the current theme matches the specified mode, false otherwise
   */
  async isThemeMode(mode: string): Promise<boolean> {
    const currentTheme = await this.getCurrentTheme();
    return currentTheme === mode;
  }

  /**
   * Search for documentation.
   * @param searchTerm - The term to search for
   */
  async searchDocumentation(searchTerm: string): Promise<void> {
    // Example of additional functionality that could be added
    const searchButtonSelector = 'button[aria-label="Search"]';
    const searchInputSelector = 'input[aria-label="Search"]';
    await this.click(searchButtonSelector);
    await this.fill(searchInputSelector, searchTerm);
    // Additional steps would be added here to handle search results
  }

  /**
   * Navigate to a specific section of the documentation.
   * @param sectionName - The name of the section to navigate to
   */
  async navigateToSection(sectionName: string): Promise<void> {
    // Example of additional functionality that could be added
    const sectionSelector = `nav >> a:text-is("${sectionName}")`;
    await this.click(sectionSelector);
    // Additional steps would be added here to verify navigation
  }
}
