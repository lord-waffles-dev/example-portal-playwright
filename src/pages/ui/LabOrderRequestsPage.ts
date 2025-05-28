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
  };

  /**
   * Constructor for the LabOrderRequestsPage class.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      labOrdersDataGrid: '[role="grid"]', // More reliable selector targeting the semantic role
      labOrdersGridLoading: '.MuiDataGrid-loadingOverlay', // To detect when grid is loading
      galleriTab: '[role="tab"]:has-text("Galleri")', // Selector for the Galleri tab
      cologuardTab: '[role="tab"]:has-text("Cologuard")',
      ...customSelectors
    };
  }

  /**
   * Wait for the Lab Orders DataGrid to appear and finish loading.
   * The DataGrid can take a while to load due to backend slowness.
   */
  async waitForLabOrdersDataGrid(): Promise<void> {
    console.log('Waiting for Lab Orders DataGrid to load...');
    // First wait for the grid container to be present
    const dataGrid = this.page.locator(this.selectors.labOrdersDataGrid);
    await dataGrid.waitFor({ state: 'attached', timeout: 60000 });
    console.log('Grid container is present, waiting for data to load...');
    try {
      // Wait for loading overlay to appear (this happens when the stored proc runs)
      const loadingOverlay = this.page.locator(this.selectors.labOrdersGridLoading);
      await loadingOverlay.waitFor({ state: 'visible', timeout: 5000 });
      console.log('Loading overlay appeared, waiting for it to disappear...');
      // Then wait for loading overlay to disappear (means data finished loading)
      await loadingOverlay.waitFor({ state: 'hidden', timeout: 60000 });
      console.log('Loading overlay disappeared, grid should be ready');
    } catch {
      // If we didn't see the loading overlay, proceed
      console.log('Loading overlay was not detected, continuing...');
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

  /**
   * Click on the Galleri tab in the Lab Orders page.
   */
  async clickGalleriTab(): Promise<void> {
    await this.click(this.selectors.galleriTab);
  }

  /**
   * Click on the Cologuard tab in the Lab Orders page.
   */
  async clickCologuardTab(): Promise<void> {
    await this.click(this.selectors.cologuardTab);
  }
}
