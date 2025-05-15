# Cucumber-Playwright

![Test](https://github.com/Tallyb/cucumber-playwright/workflows/Test/badge.svg)

A starter repo for writing E2E tests based on Cucumber with Playwright using TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Debugging Tests](#debugging-tests)
- [Reporting](#reporting)
- [Configuration](#configuration)
- [Advanced Topics](#advanced-topics)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Resources](#resources)

## Introduction

Cucumber-Playwright is a framework for writing end-to-end (E2E) tests using Behavior-Driven Development (BDD) principles with Cucumber and Playwright. This combination allows you to:

- Write tests in natural language using Gherkin syntax
- Automate browsers with Playwright's powerful API
- Structure tests in a way that's understandable by non-technical stakeholders
- Generate comprehensive reports

For more information about the motivation behind this project, you can [read this article](https://tally-b.medium.com/e2e-testing-with-cucumber-and-playwright-9584d3ef3360) or [watch this video](https://www.youtube.com/watch?v=PUVFmhYJNJA&list=PLwwCtx3xQxlVMZzS4oi2TafVRngQ1wF_0&index=2).

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Basic knowledge of TypeScript, Cucumber, and Playwright

## Installation

1. Create a new repository using this template or clone it directly:
   ```bash
   git clone cucumber-playwright-template
   cd cucumber-playwright-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

```
cucumber-playwright/
├── features/                 # Feature files written in Gherkin
│   ├── api/                  # API test features
│   ├── perf/                 # Performance test features
│   ├── ui/                   # UI test features
│   ├── playwright.feature    # Example feature file
│   └── ...
├── src/
│   ├── steps/                # Step definitions
│   │   ├── api/              # API-related step definitions
│   │   ├── common/           # Common step definitions
│   │   │   └── general.steps.ts  # General step definitions
│   │   ├── perf/             # Performance test step definitions
│   │   └── ui/               # UI test step definitions
│   ├── support/              # Support files
│   │   ├── common-hooks.ts   # Common hooks for test setup/teardown
│   │   ├── config.ts         # Configuration options
│   │   └── custom-world.ts   # Custom world for sharing context
│   └── utils/                # Utility functions
├── reports/                  # Test reports
├── screenshots/              # Screenshots captured during tests
├── traces/                   # Playwright traces
├── cucumber.js              # Cucumber configuration
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Your First Test

1. Create a new feature file in the `features` directory:
   ```gherkin
   # features/example.feature
   Feature: Example Feature

     Scenario: Basic example
       Given I navigate to "https://example.com"
       Then I should see the title "Example Domain"
   ```

2. Implement the step definitions in `src/steps/example.steps.ts`:
   ```typescript
   import { Given, Then } from '@cucumber/cucumber';
   import { ICustomWorld } from '../support/custom-world';
   import { expect } from '@playwright/test';

   Given('I navigate to {string}', async function(this: ICustomWorld, url: string) {
     const page = this.page!;
     await page.goto(url);
   });

   Then('I should see the title {string}', async function(this: ICustomWorld, title: string) {
     const page = this.page!;
     await expect(page).toHaveTitle(title);
   });
   ```

3. Run your test:
   ```bash
   npm run test features/example.feature
   ```

## Writing Tests

### Feature Files

Feature files use Gherkin syntax and should be placed in the `features` directory. Example:

```gherkin
Feature: Search functionality

  Background:
    Given I am on the search page

  Scenario: Basic search
    When I search for "cucumber playwright"
    Then I should see search results

  Scenario Outline: Search with different terms
    When I search for "<term>"
    Then I should see "<expected>" in the results

    Examples:
      | term    | expected |
      | testing | testing  |
      | BDD     | behavior |
```

### Step Definitions

Step definitions connect Gherkin steps to JavaScript code and should be placed in the `src/steps` directory. Example:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
import { expect } from '@playwright/test';

Given('I am on the search page', async function(this: ICustomWorld) {
  const page = this.page!;
  await page.goto('https://example.com/search');
});

When('I search for {string}', async function(this: ICustomWorld, term: string) {
  const page = this.page!;
  await page.fill('input[name="q"]', term);
  await page.press('input[name="q"]', 'Enter');
});

Then('I should see search results', async function(this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('.results-item')).toBeVisible();
});

Then('I should see {string} in the results', async function(this: ICustomWorld, expected: string) {
  const page = this.page!;
  await expect(page.locator('.results-container')).toContainText(expected);
});
```

## Running Tests

### Run All Tests

```bash
npm run test
# or
npx cucumber-js
```

### Run a Specific Feature

```bash
npm run test features/example.feature
# or
npx cucumber-js features/example.feature
```

### Run Tests with Tags

```bash
npm run test -- --tags @smoke
# or
npx cucumber-js --tags @smoke
```

### Run Tests in Parallel

```bash
npm run test:parallel
```

## Browser Selection

By default, tests run in Chromium. You can specify a different browser using the `BROWSER` environment variable:

**Linux/Mac:**
```bash
BROWSER=firefox npm run test
```

**Windows:**
```bash
set BROWSER=firefox
npm run test
```

Available options: `chromium`, `firefox`, `webkit`, `chrome`, `msedge`

## Debugging Tests

### CLI Debugging

- `npm run debug` - Run in headful mode with debugging enabled
- `npm run api` - Run in headless mode with API debugging
- `npm run video` - Run in headless mode with video recording

### Visual Studio Code Debugging

1. Open the feature file you want to debug
2. Select the debug options in the VSCode debugger
3. Set breakpoints in your code
4. Start debugging

You can also add the `Then debug` step to your feature file to pause execution at that point.

## Reporting

### HTML Report

After running tests, generate an HTML report:
```bash
npm run report
```

### Allure Report

Note: Allure reporting is included in the dependencies but not currently configured in the scripts. To use Allure reporting, you would need to add the appropriate scripts to package.json.

The project includes the allure-cucumberjs package (version 3.2.1) which can be configured for reporting if needed.

## Configuration

Configuration options are defined in `src/support/config.ts`. You can customize:

- Browser options
- Base URL
- API endpoints
- Image comparison thresholds

## Advanced Topics

### Working with APIs

The framework includes support for API testing. Example:

```typescript
// In your step definition
When('I send a GET request to {string}', async function(this: ICustomWorld, endpoint: string) {
  const response = await this.server!.get(endpoint);
  this.response = response;
});

Then('I should receive status code {int}', async function(this: ICustomWorld, status: number) {
  expect(this.response.status()).toBe(status);
});
```

## Troubleshooting

### Common Issues

1. **Tests fail with timeout errors**
   - Increase the default timeout in `src/support/common-hooks.ts`
   - Check for slow network connections or application responses

2. **Browser doesn't launch**
   - Ensure you have the necessary browser dependencies installed
   - Check for conflicting browser processes

3. **Element not found errors**
   - Use more reliable selectors
   - Add wait statements for dynamic content
   - Check if the element is inside an iframe

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Gherkin Syntax Reference](https://cucumber.io/docs/gherkin/reference/)

---
