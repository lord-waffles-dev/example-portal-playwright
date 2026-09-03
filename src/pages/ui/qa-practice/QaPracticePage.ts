import { expect, Page } from '@playwright/test';
import { BasePage } from '../../common/BasePage';
import { config } from '../../../support/config';

export class QaPracticePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.navigateTo(config.targets.qaPractice.baseUrl);
    await expect(this.page.getByRole('heading', { name: 'Welcome!', exact: true })).toBeVisible();
  }

  async openPage(path: string): Promise<void> {
    const targetUrl = new URL(path, config.targets.qaPractice.baseUrl).toString();
    await this.navigateTo(targetUrl);
  }

  async verifyPath(path: string): Promise<void> {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    await expect(this.page).toHaveURL(new RegExp(`${normalizedPath.replace('.', '\\.')}$`));
  }

  async verifyHeading(heading: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }

  async loginToEcommerce(email: string, password: string): Promise<void> {
    await this.fill('#email', email);
    await this.fill('#password', password);
    await this.click('#submitLoginBtn');
  }

  async verifyEcommerceLoginSuccess(): Promise<void> {
    await expect(this.page.locator('#prooood')).toBeVisible();
    await expect(this.page.locator('#loginSection')).toHaveCount(0);
    await expect(this.page.locator('#logout')).toBeVisible();
  }

  async addFirstAvailableProductToCart(): Promise<void> {
    const addToCartButton = this.page.locator('.shop-item-button').first();
    await addToCartButton.waitFor({ state: 'visible' });
    await addToCartButton.click();
  }

  async verifyCartHasItems(): Promise<void> {
    await expect(this.page.locator('.cart-items .cart-row')).toHaveCount(1);
    await expect(this.page.locator('.cart-total-price')).not.toHaveText('$0');
  }

  async proceedToCheckout(): Promise<void> {
    await this.click('.btn-purchase');
    await expect(this.page.locator('#shipping-address')).toBeVisible();
  }

  async fillShippingDetails(phone: string, street: string, city: string, country: string): Promise<void> {
    await this.fill('#phone', phone);
    await this.fill('input[name="street"]', street);
    await this.fill('input[name="city"]', city);
    await this.page.selectOption('#countries_dropdown_menu', { label: country });
  }

  async submitOrder(): Promise<void> {
    await this.click('#submitOrderBtn');
  }

  async verifyOrderSubmitted(street: string, city: string, country: string): Promise<void> {
    const message = this.page.locator('#message');
    await expect(message).toBeVisible();
    await expect(message).toContainText('has been registered');
    await expect(message).toContainText(`${street}, ${city} - ${country}`);
  }

  async logoutFromEcommerce(): Promise<void> {
    await this.click('#logout');
  }

  async verifyLoggedOutFromEcommerce(): Promise<void> {
    await expect(this.page.locator('#loginSection')).toBeVisible();
    await expect(this.page.locator('#logout')).toHaveCount(0);
    await this.verifyPath('auth_ecommerce.html');
  }
}