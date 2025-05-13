import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';
import { HeaderComponent } from '../common/components/HeaderComponent';

/**
 * HomePage class that represents a home page.
 * This class extends BasePage and uses the HeaderComponent.
 * This demonstrates how to compose page objects from components.
 */
export class HomePage extends BasePage {
  // Components
  private readonly header: HeaderComponent;

  // Selectors for home page elements
  private readonly mainContentSelector = 'main';
  private readonly heroSectionSelector = '.hero-section';
  private readonly featuredContentSelector = '.featured-content';
  private readonly ctaButtonSelector = '.cta-button';
  // private readonly newsletterFormSelector = '.newsletter-form';
  private readonly newsletterEmailInputSelector = '.newsletter-form input[type="email"]';
  private readonly newsletterSubmitButtonSelector = '.newsletter-form button[type="submit"]';
  private readonly newsletterSuccessMessageSelector = '.newsletter-success-message';

  /**
   * Constructor for the HomePage class.
   * @param page - The Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  /**
   * Get the header component.
   * @returns The header component
   */
  getHeader(): HeaderComponent {
    return this.header;
  }

  /**
   * Navigate to the home page.
   * @param url - The URL of the home page
   */
  async navigateToHomePage(url: string): Promise<void> {
    await this.navigateTo(url);
    await this.waitForElement(this.mainContentSelector);
  }

  /**
   * Check if the hero section is visible.
   * @returns True if the hero section is visible, false otherwise
   */
  async isHeroSectionVisible(): Promise<boolean> {
    return await this.isVisible(this.heroSectionSelector);
  }

  /**
   * Check if the featured content is visible.
   * @returns True if the featured content is visible, false otherwise
   */
  async isFeaturedContentVisible(): Promise<boolean> {
    return await this.isVisible(this.featuredContentSelector);
  }

  /**
   * Click on the CTA button.
   */
  async clickCtaButton(): Promise<void> {
    await this.click(this.ctaButtonSelector);
  }

  /**
   * Subscribe to the newsletter.
   * @param email - The email to subscribe with
   */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.fill(this.newsletterEmailInputSelector, email);
    await this.click(this.newsletterSubmitButtonSelector);
    await this.waitForElement(this.newsletterSuccessMessageSelector);
  }

  /**
   * Get the newsletter success message.
   * @returns The newsletter success message
   */
  async getNewsletterSuccessMessage(): Promise<string> {
    return await this.getText(this.newsletterSuccessMessageSelector);
  }

  /**
   * Search for content using the header component.
   * @param searchTerm - The term to search for
   */
  async searchForContent(searchTerm: string): Promise<void> {
    await this.header.search(searchTerm);
  }

  /**
   * Login using the header component.
   */
  async login(): Promise<void> {
    await this.header.login();
  }

  /**
   * Logout using the header component.
   */
  async logout(): Promise<void> {
    await this.header.logout();
  }

  /**
   * Get the current username using the header component.
   * @returns The current username
   */
  async getCurrentUserName(): Promise<string> {
    return await this.header.getCurrentUserName();
  }
}
