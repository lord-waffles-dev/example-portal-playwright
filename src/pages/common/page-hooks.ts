import { Before, After } from '@cucumber/cucumber';
import { PageFactory } from './PageFactory';

/**
 * Hooks for page objects.
 * These hooks are used to initialize and clean up page objects.
 */

/**
 * Before hook that runs before each scenario.
 * This hook is used to initialize the PageFactory.
 */
Before(function () {
  // Initialize the PageFactory
  // This is a placeholder for any initialization that might be needed in the future
});

/**
 * After hook that runs after each scenario.
 * This hook is used to clean up the PageFactory.
 */
After(function () {
  // Clear all cached page objects
  PageFactory.clearPages();
});
