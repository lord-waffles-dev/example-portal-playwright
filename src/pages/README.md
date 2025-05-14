# Page Objects

This directory contains page objects for the Cucumber-Playwright test automation framework. Page objects are a design pattern that helps to create an abstraction layer between the test code and the UI elements of the application under test.

## Structure

The page objects are organized into the following directories:

- `common`: Contains common page objects and utilities that can be used across different pages.
- `ui`: Contains page objects for specific UI pages.

## Page Object Pattern

The Page Object Pattern is a design pattern that creates an object repository for web UI elements. The benefit is that it helps reduce code duplication and improves test maintenance.

### Benefits of Page Object Pattern

1. **Separation of Concerns**: Separates test logic from page-specific code.
2. **Reusability**: Page objects can be reused across multiple tests.
3. **Maintainability**: Changes to the UI only require updates in one place.
4. **Readability**: Makes tests more readable and easier to understand.

## Base Page Object

The `BasePage` class provides common functionality for all page objects. It includes methods for navigation, waiting for elements, clicking, filling form fields, getting text, checking visibility, and getting attributes.

```typescript
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  // ... other methods
}
```

## Page Factory

The `PageFactory` class helps with creating and managing page objects. It follows the Factory pattern to create page objects and provides methods for getting page objects of specific types.

```typescript
import { Page } from '@playwright/test';
import { PlaywrightPage } from '../ui/PlaywrightPage';
import { FormPage } from '../ui/FormPage';
import { HomePage } from '../ui/HomePage';

export class PageFactory {
  private static pages = new Map<string, any>();

  static getPage<T>(pageType: new (page: Page, customSelectors?: object) => T, page: Page, customSelectors = {}): T {
    const pageTypeName = pageType.name;
    const key = `${pageTypeName}-${JSON.stringify(customSelectors)}`;

    if (!this.pages.has(key)) {
      this.pages.set(key, new pageType(page, customSelectors));
    }

    return this.pages.get(key) as T;
  }

  static getPlaywrightPage(page: Page, customSelectors = {}): PlaywrightPage {
    return this.getPage(PlaywrightPage, page, customSelectors);
  }

  static getFormPage(page: Page, customSelectors = {}): FormPage {
    return this.getPage(FormPage, page, customSelectors);
  }

  static getHomePage(page: Page, customSelectors = {}): HomePage {
    return this.getPage(HomePage, page, customSelectors);
  }

  static clearPages(): void {
    this.pages.clear();
  }
}
```

## Example Page Object

The `PlaywrightPage` class is an example page object that represents the Playwright documentation website. It extends the `BasePage` class and provides specific functionality for the Playwright website.

```typescript
import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { config } from '../../support/config';

export class PlaywrightPage extends BasePage {
  private readonly selectors: {
    logo: string;
    themeToggle: string;
    html: string;
    searchButton: string;
    searchInput: string;
  };

  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      // logo: 'nav >> a >> text="Playwright"',
      // themeToggle: 'nav >> button[title*="dark and light mode"]',
      // html: 'html',
      // searchButton: 'button[aria-label="Search"]',
      // searchInput: 'input[aria-label="Search"]',
      ...customSelectors
    };
  }

  async navigateToPlaywrightDocs(): Promise<void> {
    await this.navigateTo(config.BASE_URL);
    await this.waitForElement(this.selectors.logo);
  }

  // ... other methods
}
```

## Selector Management

The page objects in this project use a selector management approach that allows for easy customization of selectors without modifying the page object classes themselves. Each page object has a `selectors` object that contains all the selectors used by the page object. The `selectors` object is initialized in the constructor with default values, and can be overridden by passing a `customSelectors` object to the constructor.

### Using Custom Selectors

You can customize selectors when getting a page object from the `PageFactory`:

```typescript
// Using default selectors
const playwrightPage = PageFactory.getPlaywrightPage(page);

// Using custom selectors
const customSelectors = {
  logo: 'custom-logo-selector',
  themeToggle: 'custom-theme-toggle-selector'
};
const playwrightPageWithCustomSelectors = PageFactory.getPlaywrightPage(page, customSelectors);
```

This approach has several benefits:
1. **Centralized Selectors**: All selectors are defined in one place, making them easier to manage.
2. **Customizable Selectors**: Selectors can be customized without modifying the page object classes.
3. **Type Safety**: The selector object is typed, providing better IDE support and catching errors at compile time.
4. **Caching**: The `PageFactory` caches page objects with different custom selectors, improving performance.

## Using Page Objects in Step Definitions

Page objects can be used in step definitions to interact with the UI. Here's an example of how to use the `PlaywrightPage` page object in a step definition:

```typescript
import { ICustomWorld } from '../../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PageFactory } from '../../pages/common/PageFactory';

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const page = this.page!;
  const playwrightPage = PageFactory.getPlaywrightPage(page);
  await playwrightPage.navigateToPlaywrightDocs();
});

When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const playwrightPage = PageFactory.getPlaywrightPage(page);
  await playwrightPage.changeTheme(mode);
});

Then('We see {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const playwrightPage = PageFactory.getPlaywrightPage(page);
  const isCorrectMode = await playwrightPage.isThemeMode(mode);
  expect(isCorrectMode).toBeTruthy();
});
```

### Using Custom Selectors in Step Definitions

You can also use custom selectors in step definitions:

```typescript
import { ICustomWorld } from '../../support/custom-world';
import { Given } from '@cucumber/cucumber';
import { PageFactory } from '../../pages/common/PageFactory';

Given('Go to the playwright website with custom selectors', async function (this: ICustomWorld) {
  const page = this.page!;
  const customSelectors = {
    logo: 'custom-logo-selector',
    themeToggle: 'custom-theme-toggle-selector'
  };
  const playwrightPage = PageFactory.getPlaywrightPage(page, customSelectors);
  await playwrightPage.navigateToPlaywrightDocs();
});
```

This is particularly useful when testing different versions of a page or when dealing with localization where selectors might change based on the language.

## Best Practices

1. **Keep Page Objects Simple**: Page objects should only contain methods that interact with the UI.
2. **Use Descriptive Method Names**: Method names should describe the action being performed.
3. **Encapsulate Selectors**: Selectors should be encapsulated within the page object.
4. **Use the Page Factory**: Use the PageFactory to create and manage page objects.
5. **Extend the BasePage**: All page objects should extend the BasePage class.
6. **Use TypeScript**: Use TypeScript to get type checking and better IDE support.
7. **Document Your Code**: Use JSDoc comments to document your code.
