import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * LabOrderRequestsPage class.
 * This class extends BasePage and provides specific functionality for the Lab Order Requests page.
 */
export class LabOrderRequestsPage extends BasePage {
  private readonly selectors: {
    labOrdersDataGrid: string;
    labOrdersGridLoading: string;
    galleriTab: string;
    cologuardTab: string;
    approvedOrdersButton: string;
    pendingRequestsButton: string;
    searchInput: string;
    noResultsMessage: string;
    alertMessage: string;
    reviewButton: string;
    cologuardModal: string;
    galleriModal: string;
    cancelButton: string;
  };

  /**
   * Constructor for the LabOrderRequestsPage class.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      labOrdersDataGrid: '[role="grid"]',
      labOrdersGridLoading: '.MuiDataGrid-loadingOverlay',
      galleriTab: '[role="tab"]:has-text("Galleri")',
      cologuardTab: '[role="tab"]:has-text("Cologuard")',
      approvedOrdersButton: 'label:has-text("Approved orders")',
      pendingRequestsButton: 'label:has-text("Pending requests")',
      searchInput: 'input.MuiInputBase-input',
      noResultsMessage: '.MuiDataGrid-overlay',
      alertMessage: '.MuiAlert-message',
      reviewButton: 'button.MuiButton-root.MuiButton-text:has-text("Review")',
      cologuardModal: '[role="dialog"][aria-labelledby="dialog__title"]:has-text("Cologuard Request")',
      galleriModal: '[role="dialog"][aria-labelledby="dialog__title"]:has-text("Galleri Request")',
      cancelButton: 'button.MuiButton-root:has-text("Cancel")',
      ...customSelectors
    };
  }

  /**
   * Wait for the Lab Orders DataGrid to appear and finish loading.
   * The DataGrid can take a while to load due to backend slowness.
   */
  async waitForLabOrdersDataGrid(): Promise<void> {
    console.log('Waiting for Lab Orders DataGrid to load...');
    // First, wait for the grid container to be present
    const dataGrid = this.page.locator(this.selectors.labOrdersDataGrid);
    await dataGrid.waitFor({ state: 'attached', timeout: 60000 });
    try {
      // Wait for the loading overlay to appear (this happens when the stored proc runs)
      const loadingOverlay = this.page.locator(this.selectors.labOrdersGridLoading);
      await loadingOverlay.waitFor({ state: 'visible', timeout: 5000 });
      // Then wait for the loading overlay to disappear (means data finished loading)
      await loadingOverlay.waitFor({ state: 'hidden', timeout: 60000 });
    } catch {
      // If we didn't see the loading overlay, proceed
    }
    // Final verification that grid is visible and interactive
    await expect(dataGrid).toBeVisible({ timeout: 60000 });
    console.log('Lab Orders DataGrid has loaded successfully');
  }

  /**
   * Verify that the Lab Orders page has loaded completely with the data grid.
   * This is a wrapper method that calls waitForLabOrdersDataGrid.
   */
  async verifyLabOrdersPageLoaded(): Promise<void> {
    await this.waitForLabOrdersDataGrid();
    console.log('Lab Orders page loaded successfully with data grid');
  }

  async clickGalleriTab(): Promise<void> {
    await this.click(this.selectors.galleriTab);
  }

  async clickCologuardTab(): Promise<void> {
    await this.click(this.selectors.cologuardTab);
  }

  async clickPendingRequests(): Promise<void> {
    await this.click(this.selectors.pendingRequestsButton);
  }

  async clickApprovedOrders(): Promise<void> {
    await this.click(this.selectors.approvedOrdersButton);
  }

  async clickCancelButton(): Promise<void> {
    await this.click(this.selectors.cancelButton);
  }

  /**
   * Click the Review button if it exists, fail if it doesn't
   * @throws Error if the Review button is not found
   */
  async clickReviewButton(): Promise<void> {
    await this.waitForLabOrdersDataGrid();
    const reviewButton = this.page.locator('button.MuiButton-root', { hasText: 'Review' }).first();
    await reviewButton.waitFor({ state: 'visible', timeout: 10000 });
    await reviewButton.click();
  }

  /**
   * Enter a search term in the grid search input.
   * @param searchTerm - The term to search for
   */
  async searchInGrid(searchTerm: string): Promise<void> {
    const searchInput = this.page.locator(this.selectors.searchInput);
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(searchTerm);
    await this.waitForLabOrdersDataGrid();
  }

  /**
   * Verify the search results or alert message
   * @param expectedMessage - The expected message to verify
   */
  async verifySearchResult(expectedMessage: string): Promise<void> {
    const gridMessage = this.page.locator(this.selectors.noResultsMessage);
    const alertMessage = this.page.locator(this.selectors.alertMessage);

    // First, wait for the grid to finish any loading
    await this.waitForLabOrdersDataGrid();

    for (let i = 0; i < 10; i++) {
      try {
        const hasGridMessage = await gridMessage.isVisible();
        if (hasGridMessage && (await gridMessage.textContent() ?? '').trim() === expectedMessage) {
          return;
        }

        const hasAlertMessage = await alertMessage.isVisible();
        if (hasAlertMessage && (await alertMessage.textContent() ?? '').trim() === expectedMessage) {
          return;
        }

        await this.page.waitForTimeout(500);
      } catch {
        // Continue checking
      }
    }

    throw new Error(`Expected message "${expectedMessage}" not found in grid or alert`);
  }

  async isCologuardRequestVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.cologuardModal);
  }

  async isGalleriRequestVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.galleriModal);
  }
}
