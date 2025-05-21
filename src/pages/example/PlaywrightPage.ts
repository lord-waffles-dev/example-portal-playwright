import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { config } from '../../support/config';

/**
 * PlaywrightPage class that represents the Playwright documentation website.
 * This class extends BasePage and provides specific functionality for the Playwright website.
 */
export class PlaywrightPage extends BasePage {
  private readonly selectors: {
    logo: string;
    themeToggle: string;
    html: string;
    searchButton: string;
    searchInput: string;
  };

  /**
   * Constructor for the PlaywrightPage class.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      logo: 'nav >> a >> text="Playwright"',
      themeToggle: 'nav >> button[title*="dark and light mode"]',
      html: 'html',
      searchButton: 'button[aria-label="Search"]',
      searchInput: 'input[aria-label="Search"]',
      ...customSelectors
    };
  }

  /**
   * Navigate to the Playwright documentation website.
   */
  async navigateToPlaywrightDocs(): Promise<void> {
    await this.navigateTo(config.EXAMPLE_URL);
    await this.waitForElement(this.selectors.logo);
  }

  /**
   * Get the current theme.
   * @returns The current theme ('light' or 'dark')
   */
  async getCurrentTheme(): Promise<string> {
    return (await this.getAttribute(this.selectors.html, 'data-theme')) ?? '';
  }

  /**
   * Change the theme to the specified mode.
   * @param mode - The theme mode ('light' or 'dark')
   */
  async changeTheme(mode: string): Promise<void> {
    const currentTheme = await this.getCurrentTheme();
    // Only click the toggle if the current theme is different from the desired theme
    if (currentTheme !== mode) {
      await this.click(this.selectors.themeToggle);
    }
    // Wait for the theme to change
    await this.page.locator(`${this.selectors.html}[data-theme=${mode}]`).waitFor();
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
    await this.click(this.selectors.searchButton);
    await this.fill(this.selectors.searchInput, searchTerm);
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
