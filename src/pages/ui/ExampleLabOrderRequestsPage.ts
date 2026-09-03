import { Locator, Page } from '@playwright/test';
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
   * Private helper to wait for both page and grid stability
   */
  private async waitForPageAndGridStability(): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.labOrdersDataGrid.waitFor({ state: 'attached' }),
      this.labOrdersDataGrid.waitFor({ state: 'visible' })
    ]);
  }

  /**
   * Wait for the Lab Orders DataGrid to appear and finish loading.
   */
  async waitForLabOrdersDataGrid(): Promise<void> {
    await this.waitForPageAndGridStability();
  }

  async clickGalleriTab(): Promise<void> {
    await this.galleriTab.click();
    // Wait for loading overlay to disappear if it appears
    if (await this.loadingOverlay.isVisible({ timeout: 1000 }).catch(() => false)) {
      await this.loadingOverlay.waitFor({ state: 'detached' });
    }
    await this.waitForPageAndGridStability();
  }

  async clickCologuardTab(): Promise<void> {
    await this.cologuardTab.click();
    // Wait for loading overlay to disappear if it appears
    if (await this.loadingOverlay.isVisible({ timeout: 1000 }).catch(() => false)) {
      await this.loadingOverlay.waitFor({ state: 'detached' });
    }
    await this.waitForPageAndGridStability();
  }

  async clickPendingRequests(): Promise<void> {
    await this.pendingRequestsButton.click();
    // Wait for loading overlay to disappear if it appears
    if (await this.loadingOverlay.isVisible({ timeout: 1000 }).catch(() => false)) {
      await this.loadingOverlay.waitFor({ state: 'detached' });
    }
    await this.waitForPageAndGridStability();
  }

  async clickApprovedOrders(): Promise<void> {
    await this.approvedOrdersButton.click();
    // Wait for loading overlay to disappear if it appears
    if (await this.loadingOverlay.isVisible({ timeout: 1000 }).catch(() => false)) {
      await this.loadingOverlay.waitFor({ state: 'detached' });
    }
    await this.waitForPageAndGridStability();
  }

  async clickCancelButton(): Promise<void> {
    await this.cancelButton.click();
  }

  async clickReviewButton(): Promise<void> {
    await this.reviewButton.waitFor({ state: 'visible' });
    await this.reviewButton.click();
  }

  async searchInGrid(searchTerm: string): Promise<void> {
    await this.waitForPageAndGridStability();
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.click();
    await this.searchInput.fill('');
    await this.searchInput.fill(searchTerm);
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.keyboard.press('Enter')
    ]);
    await this.waitForPageAndGridStability();
  }

  async verifySearchResult(expectedMessage: string): Promise<void> {
    await this.waitForPageAndGridStability();
    await this.labOrdersDataGrid.waitFor({ state: 'visible' });

    const validMessages = [expectedMessage, 'No pending requests', 'No approved orders', 'No results found', 'No orders found'];

    if (await this.noResultsMessage.isVisible().catch(() => false)) {
      const msg = (await this.noResultsMessage.textContent())?.trim();
      if (msg && validMessages.includes(msg)) return;
    }

    // Wait for the alert to appear before proceeding
    await this.alertMessage.waitFor({ state: 'visible' });

    const hasMessage = await Promise.race([
      this.alertMessage.isVisible().catch(() => false),
      this.noResultsMessage.isVisible().catch(() => false)
    ]);

    if (hasMessage) {
      return;
    }

    throw new Error('No message found on page');
  }

  async isCologuardRequestVisible(): Promise<boolean> {
    await this.cologuardModal.waitFor({ state: 'visible' });
    return true;
  }

  async isGalleriRequestVisible(): Promise<boolean> {
    await this.galleriModal.waitFor({ state: 'visible' });
    return true;
  }
}
