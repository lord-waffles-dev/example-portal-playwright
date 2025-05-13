import { Page } from '@playwright/test';

/**
 * HeaderComponent class that represents a header component.
 * This class demonstrates how to handle reusable components.
 */
export class HeaderComponent {
  // Selectors for header elements
  private readonly headerSelector = 'header';
  private readonly logoSelector = 'header >> .logo';
  private readonly navigationSelector = 'header >> nav';
  private readonly searchButtonSelector = 'header >> button[aria-label="Search"]';
  private readonly searchInputSelector = 'header >> input[aria-label="Search"]';
  // private readonly userMenuSelector = 'header >> .user-menu';
  private readonly userMenuButtonSelector = 'header >> .user-menu-button';
  private readonly userMenuDropdownSelector = 'header >> .user-menu-dropdown';
  private readonly loginButtonSelector = 'header >> .login-button';
  private readonly logoutButtonSelector = 'header >> .logout-button';

  /**
   * Constructor for the HeaderComponent class.
   * @param page - The Playwright Page object
   */
  constructor(private readonly page: Page) {}

  /**
   * Check if the header is visible.
   * @returns True if the header is visible, false otherwise
   */
  async isVisible(): Promise<boolean> {
    return await this.page.locator(this.headerSelector).isVisible();
  }

  /**
   * Click on the logo.
   */
  async clickLogo(): Promise<void> {
    await this.page.locator(this.logoSelector).click();
  }

  /**
   * Click on a navigation link.
   * @param linkText - The text of the navigation link
   */
  async clickNavigationLink(linkText: string): Promise<void> {
    await this.page.locator(`${this.navigationSelector} >> text="${linkText}"`).click();
  }

  /**
   * Search for a term.
   * @param searchTerm - The term to search for
   */
  async search(searchTerm: string): Promise<void> {
    await this.page.locator(this.searchButtonSelector).click();
    await this.page.locator(this.searchInputSelector).fill(searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Open the user menu.
   */
  async openUserMenu(): Promise<void> {
    await this.page.locator(this.userMenuButtonSelector).click();
    await this.page.locator(this.userMenuDropdownSelector).waitFor({ state: 'visible' });
  }

  /**
   * Close the user menu.
   */
  async closeUserMenu(): Promise<void> {
    if (await this.page.locator(this.userMenuDropdownSelector).isVisible()) {
      await this.page.locator(this.userMenuButtonSelector).click();
      await this.page.locator(this.userMenuDropdownSelector).waitFor({ state: 'hidden' });
    }
  }

  /**
   * Login.
   */
  async login(): Promise<void> {
    if (await this.page.locator(this.loginButtonSelector).isVisible()) {
      await this.page.locator(this.loginButtonSelector).click();
    } else {
      await this.openUserMenu();
      await this.page.locator(this.loginButtonSelector).click();
    }
  }

  /**
   * Logout.
   */
  async logout(): Promise<void> {
    if (await this.page.locator(this.logoutButtonSelector).isVisible()) {
      await this.page.locator(this.logoutButtonSelector).click();
    } else {
      await this.openUserMenu();
      await this.page.locator(this.logoutButtonSelector).click();
    }
  }

  /**
   * Get the current username.
   * @returns The current username
   */
  async getCurrentUserName(): Promise<string> {
    return await this.page.locator(this.userMenuButtonSelector).textContent() ?? '';
  }
}
