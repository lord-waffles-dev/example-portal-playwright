import { Page } from '@playwright/test';
import { LoginPage } from '../ui/LoginPage';
import { DashboardPage } from '../ui/DashboardPage';
import { LabOrderRequestsPage } from '../ui/LabOrderRequestsPage';
import { VisitsPage } from '../ui/VisitsPage';

/**
 * PageFactory class that helps with creating and managing page objects.
 * This class follows the Factory pattern to create page objects.
 */
export class PageFactory {
  private static pages = new Map<string, any>();

  /**
   * Get a page object of the specified type.
   * If the page object doesn't exist, it will be created.
   * @param pageType - The type of page object to get
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   * @returns The page object
   */
  static getPage<T>(pageType: new (page: Page, customSelectors?: object) => T, page: Page, customSelectors = {}): T {
    const pageTypeName = pageType.name;
    const key = `${pageTypeName}-${JSON.stringify(customSelectors)}`;

    if (!this.pages.has(key)) {
      this.pages.set(key, new pageType(page, customSelectors));
    }

    return this.pages.get(key) as T;
  }

  /**
   * Get the LoginPage object.
   * @param page - The Login Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   * @returns The LoginPage object
   */
  static getLoginPage(page: Page, customSelectors = {}): LoginPage {
    return this.getPage(LoginPage, page, customSelectors);
  }

  /**
   * Get the DashboardPage object.
   * @param page - The Login Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   * @returns The LoginPage object
   */
  static getDashboardPage(page: Page, customSelectors = {}): DashboardPage {
    return this.getPage(DashboardPage, page, customSelectors);
  }

  /**
   * Get the LabOrderRequestsPage object.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   * @returns The LabOrderRequestsPage object
   */
  static getLabOrderRequestsPage(page: Page, customSelectors = {}): LabOrderRequestsPage {
    return this.getPage(LabOrderRequestsPage, page, customSelectors);
  }

  /**
   * Get the VisitsPage object.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   * @returns The VisitsPage object
   */
  static getVisitsPage(page: Page, customSelectors = {}): VisitsPage {
    return this.getPage(VisitsPage, page, customSelectors);
  }

  /**
   * Clear all cached page objects.
   * This is useful when starting a new test.
   */
  static clearPages(): void {
    this.pages.clear();
  }
}
