# Example Portal Playwright

A repo focused on writing E2E tests with Cucumber and Playwright using TypeScript.

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
- [Publishing to GitHub](#publishing-to-github)
- [Contributing](#contributing)
- [Resources](#resources)
- [Running API Tests](#running-api-tests)

## Introduction

Cucumber-Playwright is a framework for writing end-to-end (E2E) tests using Behavior-Driven Development (BDD) principles with Cucumber and Playwright. This combination allows you to:

- Write tests in natural language using Gherkin syntax
- Automate browsers with Playwright's powerful API
- Structure tests in a way that's understandable by non-technical stakeholders
- Generate comprehensive reports

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Basic knowledge of TypeScript, Cucumber, and Playwright

## Installation

1. Create a new repository using this template or clone it directly:
   ```bash
   git clone https://github.com/<your-org-or-user>/example-portal-playwright.git
   cd example-portal-playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

```
example-portal-playwright/
├── docs/                     # Documentation files
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
├── test-results/             # Playwright test results
├── tests/                    # Additional test files
├── traces/                   # Playwright traces
├── cucumber.js              # Cucumber configuration
├── eslint.config.js         # ESLint configuration
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Your First Test

1. Create a new feature file in the `features` directory:
   ```gherkin
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
   npm run test features/general.feature
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
npm run test features/general.feature
# or
npx cucumber-js features/general.feature
```

### Run Tests with Tags

```bash
npm run test -- --tags @smoke
# or
npx cucumber-js --tags @smoke
```

### Run Specific Features

The framework includes pre-configured scripts for running specific features:

```bash
npm run feature:login        # Run login feature tests
npm run feature:dashboard    # Run dashboard feature tests
npm run feature:visits       # Run visits feature tests
npm run feature:resource-center  # Run resource center feature tests
npm run feature:lab-order-requests  # Run lab order requests feature tests
```

### Run Tests in Parallel

```bash
npm run test:parallel
```

### Viewport-Specific Testing

Run tests with specific viewport sizes:

```bash
npm run test:desktop  # Run tests with desktop viewport
npm run test:laptop   # Run tests with laptop viewport
```

### Network Capture

Capture network traffic during test execution:

```bash
npm run test:network-capture  # Run tests with network capture enabled
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

Basic debugging options:
- `npm run debug` - Run in headful mode with debugging enabled
- `npm run api` - Run in headless mode with API debugging
- `npm run video` - Run in headless mode with video recording

### Feature-Specific Debugging

Debug specific features:
```bash
npm run debug:login              # Debug login feature
npm run debug:dashboard          # Debug dashboard feature
npm run debug:visits             # Debug visits feature
npm run debug:lab-order-requests # Debug lab order requests feature
```

### Viewport-Specific Debugging

Debug with specific viewport sizes:
```bash
npm run debug:desktop  # Debug with desktop viewport
npm run debug:laptop   # Debug with laptop viewport
```

### Network Capture Debugging

Debug with network traffic capture:
```bash
npm run debug:network-capture  # Debug with network capture enabled
```

### Exploratory Testing

Run exploratory tests with debugging enabled:
```bash
npm run debug:explore  # Run exploratory tests with debugging
```

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

The project includes the allure-cucumberjs package which can be used for advanced reporting. While it's included in the dependencies, you'll need to configure it for your specific needs:

1. Add Allure reporter to your cucumber.js configuration
2. Add scripts to generate and serve Allure reports

Example configuration:
```javascript
// In cucumber.js
module.exports = {
  default: {
    // ... other options
    format: ['@cucumber/pretty-formatter', 'allure-cucumberjs']
  }
}
```

Example scripts to add to package.json:
```json
"allure:generate": "allure generate ./allure-results --clean -o ./allure-report",
"allure:open": "allure open ./allure-report"
```

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

## Publishing to GitHub

Use this section to publish the project as `example-portal-playwright`.

### 1) Verify your current remote state

```bash
git remote -v
```

If you see an `origin`, you already have a remote configured.

### 2) Rename locally (optional, folder name only)

From the parent folder of this project:

```bash
mv provider-portal-playwright example-portal-playwright
cd example-portal-playwright
```

### 3) Create `example-portal-playwright` on GitHub

- In GitHub, create a new empty repository named `example-portal-playwright`.
- Do not initialize it with README/gitignore/license if you are pushing this existing project.

### 4) Connect and push (choose one option)

#### Option A: Replace current `origin` with your new repo

```bash
git remote set-url origin https://github.com/<your-org-or-user>/example-portal-playwright.git
git branch -M main
git push -u origin main
```

#### Option B: Keep current remote as `upstream`, use new repo as `origin`

```bash
git remote rename origin upstream
git remote add origin https://github.com/<your-org-or-user>/example-portal-playwright.git
git branch -M main
git push -u origin main
```

### 5) Confirm everything

```bash
git remote -v
git status
```

Expected result: `origin` points to your `example-portal-playwright` GitHub repository, and your local `main` tracks `origin/main`.

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

## Running API Tests

The framework includes support for API testing. API tests are located in the `features/api` directory and are tagged with `@api`.

### Setting Up Environment Variables

API tests require authentication credentials and tokens. These should be stored in a `.env` file at the root of the project. This file is gitignored to prevent sensitive information from being committed to the repository.

1. Create a `.env` file in the project root directory
2. Add the following variables to the file:

```
# Login
AUTH_CLIENT_ID=[Azure KeyVault - Auth0 Client ID]
AUTH_CLIENT_SECRET=[Azure KeyVault - Auth0 Client Secret]
AUTH_USERNAME=[Agent User]
AUTH_PASSWORD=[Agen Pass]

# Bearer Token
STAGING_BEARER_TOKEN=...
```

Replace the empty values with your actual credentials and tokens.

### Running the Tests

To run all API tests:

```bash
npm run test:api
```

---
