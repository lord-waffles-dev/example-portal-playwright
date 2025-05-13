import { Page } from '@playwright/test';
import { PlaywrightPage } from '../ui/PlaywrightPage';
import { FormPage } from '../ui/FormPage';
import { HomePage } from '../ui/HomePage';

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
   * @returns The page object
   */
  static getPage<T>(pageType: new (page: Page) => T, page: Page): T {
    const pageTypeName = pageType.name;

    if (!this.pages.has(pageTypeName)) {
      this.pages.set(pageTypeName, new pageType(page));
    }

    return this.pages.get(pageTypeName) as T;
  }

  /**
   * Get the PlaywrightPage object.
   * @param page - The Playwright Page object
   * @returns The PlaywrightPage object
   */
  static getPlaywrightPage(page: Page): PlaywrightPage {
    return this.getPage(PlaywrightPage, page);
  }

  /**
   * Get the FormPage object.
   * @param page - The Playwright Page object
   * @returns The FormPage object
   */
  static getFormPage(page: Page): FormPage {
    return this.getPage(FormPage, page);
  }

  /**
   * Get the HomePage object.
   * @param page - The Playwright Page object
   * @returns The HomePage object
   */
  static getHomePage(page: Page): HomePage {
    return this.getPage(HomePage, page);
  }

  /**
   * Clear all cached page objects.
   * This is useful when starting a new test.
   */
  static clearPages(): void {
    this.pages.clear();
  }
}
