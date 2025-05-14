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

  private readonly selectors: {
    mainContent: string;
    heroSection: string;
    featuredContent: string;
    ctaButton: string;
    newsletterEmailInput: string;
    newsletterSubmitButton: string;
    newsletterSuccessMessage: string;
  };

  /**
   * Constructor for the HomePage class.
   * @param page - The Playwright Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.header = new HeaderComponent(page);
    this.selectors = {
      mainContent: 'main',
      heroSection: '.hero-section',
      featuredContent: '.featured-content',
      ctaButton: '.cta-button',
      newsletterEmailInput: '.newsletter-form input[type="email"]',
      newsletterSubmitButton: '.newsletter-form button[type="submit"]',
      newsletterSuccessMessage: '.newsletter-success-message',
      ...customSelectors
    };
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
    await this.waitForElement(this.selectors.mainContent);
  }

  /**
   * Check if the hero section is visible.
   * @returns True if the hero section is visible, false otherwise
   */
  async isHeroSectionVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.heroSection);
  }

  /**
   * Check if the featured content is visible.
   * @returns True if the featured content is visible, false otherwise
   */
  async isFeaturedContentVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.featuredContent);
  }

  /**
   * Click on the CTA button.
   */
  async clickCtaButton(): Promise<void> {
    await this.click(this.selectors.ctaButton);
  }

  /**
   * Subscribe to the newsletter.
   * @param email - The email to subscribe with
   */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.fill(this.selectors.newsletterEmailInput, email);
    await this.click(this.selectors.newsletterSubmitButton);
    await this.waitForElement(this.selectors.newsletterSuccessMessage);
  }

  /**
   * Get the newsletter success message.
   * @returns The newsletter success message
   */
  async getNewsletterSuccessMessage(): Promise<string> {
    return await this.getText(this.selectors.newsletterSuccessMessage);
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
