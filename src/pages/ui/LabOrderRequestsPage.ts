import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * LabOrderRequestsPage class represents the Lab Order Requests page
 */
export class LabOrderRequestsPage extends BasePage {
  readonly page: Page;
  readonly labOrdersDataGrid: Locator;
  readonly loadingOverlay: Locator;
  readonly galleriTab: Locator;
  readonly cologuardTab: Locator;
  readonly approvedOrdersButton: Locator;
  readonly pendingRequestsButton: Locator;
  readonly searchInput: Locator;
  readonly noResultsMessage: Locator;
  readonly alertMessage: Locator;
  readonly reviewButton: Locator;
  readonly cologuardModal: Locator;
  readonly galleriModal: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.labOrdersDataGrid = page.locator('.MuiDataGrid-root').first();
    this.loadingOverlay = page.locator('.MuiDataGrid-loadingOverlay');
    this.galleriTab = page.getByRole('tab', { name: 'Galleri' });
    this.cologuardTab = page.getByRole('tab', { name: 'Cologuard' });
    this.approvedOrdersButton = page.locator('label', { hasText: 'Approved orders' });
    this.pendingRequestsButton = page.locator('label', { hasText: 'Pending requests' });
    this.searchInput = page.locator('input[type="text"]').first();
    this.noResultsMessage = page.locator('.MuiDataGrid-overlay');
    this.alertMessage = page.locator('.MuiAlert-message');
    this.reviewButton = page.getByRole('button', { name: 'Review' }).first();
    this.cologuardModal = page.getByRole('dialog', { name: 'Cologuard Request' });
    this.galleriModal = page.getByRole('dialog', { name: 'Galleri Request' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  /**
   * Wait for the Lab Orders DataGrid to appear and finish loading.
   */
  async waitForLabOrdersDataGrid(): Promise<void> {
    await this.labOrdersDataGrid.waitFor({ state: 'attached', timeout: 60000 });
    try {
      await this.loadingOverlay.waitFor({ state: 'visible', timeout: 5000 });
      await this.loadingOverlay.waitFor({ state: 'hidden', timeout: 60000 });
    } catch {
      // If we didn't see the loading overlay, proceed
    }
    await expect(this.labOrdersDataGrid).toBeVisible({ timeout: 60000 });
  }

  async verifyLabOrdersPageLoaded(): Promise<void> {
    await this.waitForLabOrdersDataGrid();
  }

  async clickGalleriTab(): Promise<void> {
    await this.galleriTab.click();
    await this.waitForLabOrdersDataGrid();
  }

  async clickCologuardTab(): Promise<void> {
    await this.cologuardTab.click();
    await this.waitForLabOrdersDataGrid();
  }

  async clickPendingRequests(): Promise<void> {
    await this.pendingRequestsButton.click();
    await this.waitForLabOrdersDataGrid();
  }

  async clickApprovedOrders(): Promise<void> {
    await this.approvedOrdersButton.click();
    await this.waitForLabOrdersDataGrid();
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }

  async clickReviewButton(): Promise<void> {
    await this.waitForLabOrdersDataGrid();
    await this.reviewButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.reviewButton.click();
  }

  async searchInGrid(searchTerm: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.click();
    await this.searchInput.fill(searchTerm);
    await this.page.keyboard.press('Enter');
    await this.waitForLabOrdersDataGrid();
  }

  async verifySearchResult(expectedMessage: string): Promise<void> {
    await this.waitForLabOrdersDataGrid();

    for (let i = 0; i < 10; i++) {
      try {
        const hasGridMessage = await this.noResultsMessage.isVisible();
        if (hasGridMessage && (await this.noResultsMessage.textContent() ?? '').trim() === expectedMessage) {
          return;
        }

        const hasAlertMessage = await this.alertMessage.isVisible();
        if (hasAlertMessage && (await this.alertMessage.textContent() ?? '').trim() === expectedMessage) {
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
    await this.cologuardModal.waitFor({ state: 'visible', timeout: 10000 });
    return true;
  }

  async isGalleriRequestVisible(): Promise<boolean> {
    await this.galleriModal.waitFor({ state: 'visible', timeout: 10000 });
    return true;
  }
}
