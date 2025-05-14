import { Page } from '@playwright/test';

/**
 * HeaderComponent class that represents a header component.
 * This class demonstrates how to handle reusable components.
 */
export class HeaderComponent {
  private readonly selectors: {
    header: string;
    logo: string;
    navigation: string;
    searchButton: string;
    searchInput: string;
    userMenuButton: string;
    userMenuDropdown: string;
    loginButton: string;
    logoutButton: string;
  };

  /**
   * Constructor for the HeaderComponent class.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(private readonly page: Page, customSelectors = {}) {
    this.selectors = {
      header: 'header',
      logo: 'header >> .logo',
      navigation: 'header >> nav',
      searchButton: 'header >> button[aria-label="Search"]',
      searchInput: 'header >> input[aria-label="Search"]',
      userMenuButton: 'header >> .user-menu-button',
      userMenuDropdown: 'header >> .user-menu-dropdown',
      loginButton: 'header >> .login-button',
      logoutButton: 'header >> .logout-button',
      ...customSelectors
    };
  }

  /**
   * Check if the header is visible.
   * @returns True if the header is visible, false otherwise
   */
  async isVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.header).isVisible();
  }

  /**
   * Click on the logo.
   */
  async clickLogo(): Promise<void> {
    await this.page.locator(this.selectors.logo).click();
  }

  /**
   * Click on a navigation link.
   * @param linkText - The text of the navigation link
   */
  async clickNavigationLink(linkText: string): Promise<void> {
    await this.page.locator(`${this.selectors.navigation} >> text="${linkText}"`).click();
  }

  /**
   * Search for a term.
   * @param searchTerm - The term to search for
   */
  async search(searchTerm: string): Promise<void> {
    await this.page.locator(this.selectors.searchButton).click();
    await this.page.locator(this.selectors.searchInput).fill(searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Open the user menu.
   */
  async openUserMenu(): Promise<void> {
    await this.page.locator(this.selectors.userMenuButton).click();
    await this.page.locator(this.selectors.userMenuDropdown).waitFor({ state: 'visible' });
  }

  /**
   * Close the user menu.
   */
  async closeUserMenu(): Promise<void> {
    if (await this.page.locator(this.selectors.userMenuDropdown).isVisible()) {
      await this.page.locator(this.selectors.userMenuButton).click();
      await this.page.locator(this.selectors.userMenuDropdown).waitFor({ state: 'hidden' });
    }
  }

  /**
   * Login.
   */
  async login(): Promise<void> {
    if (await this.page.locator(this.selectors.loginButton).isVisible()) {
      await this.page.locator(this.selectors.loginButton).click();
    } else {
      await this.openUserMenu();
      await this.page.locator(this.selectors.loginButton).click();
    }
  }

  /**
   * Logout.
   */
  async logout(): Promise<void> {
    if (await this.page.locator(this.selectors.logoutButton).isVisible()) {
      await this.page.locator(this.selectors.logoutButton).click();
    } else {
      await this.openUserMenu();
      await this.page.locator(this.selectors.logoutButton).click();
    }
  }

  /**
   * Get the current username.
   * @returns The current username
   */
  async getCurrentUserName(): Promise<string> {
    return await this.page.locator(this.selectors.userMenuButton).textContent() ?? '';
  }
}
