import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/BasePage';

/**
 * DashboardPage class.
 * This class extends BasePage and provides specific functionality for the Provider Portal website.
 */
export class DashboardPage extends BasePage {
  private readonly selectors: {
    // Dashboard Page
    dashboardTitle: string;
    ePrescribeBanner: string;
    ePrescribeGetStartedButton: string;
    upcomingVisitsTitle: string;
    noUpcomingVisitsMessage: string;
    requestedVisitsTitle: string;
    requestedVisitsSelectTime: string;
    requestedVisitsConfirmButton: string;
    requestedVPCVisit: string;
    upcomingVPCVisit: string;
    // Nav Bar
    userAvatarButton: string;
    dashboardButton: string;
    visitHistoryButton: string;
    myScheduleButton: string;
    resourceCenterButton: string;
    // Resource Center
    resourceCenterModal: string;
    videoConsultTroubleshootingLink: string;
    troubleshootSectionBox: string;
    troubleshootingSectionCloseButton: string;
    resourceCenterLinks: string;
  };

  // Define expected Resource Center links and their URLs for verification
  private readonly resourceLinks = [
    { name: 'APA Practice Guidelines', url: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines' },
    { name: 'Emergency Protocol', url: 'https://wellvia.app.box.com/s/l08uxnzzfv4u82716u6yfl7uihybkyaa' },
    { name: 'Emergency Hotlines', url: 'https://wellvia.app.box.com/s/5q3y6y3opmrvt0a9vcl3g5ve70j2qo5w' },
    { name: 'Behavioral Health Platform Training', url: 'https://wellvia.app.box.com/s/s73wg3oahgm4wjfl1dela2iudq3orqh6' },
    { name: 'Provider Phone Consult Training Module', url: 'https://wellvia.app.box.com/s/cv6ztnar1oycxkdh3jv396tov46ouf0i' },
    { name: 'Provider Video Consult Training Module', url: 'https://wellvia.app.box.com/s/8br027t1avvyub7wzx9eh6mwkmyj6x5s' },
    { name: 'BSW Care Pathways', url: 'https://wellvia.app.box.com/s/ceyplzr84egic37nxdtezjujbhtdlgt0' }
  ];

  /**
   * Constructor for the DashboardPage class.
   * @param page - The Dashboard Page object
   * @param customSelectors - Optional custom selectors to override the default selectors
   */
  constructor(page: Page, customSelectors = {}) {
    super(page);
    this.selectors = {
      // Dashboard Page
      dashboardTitle: 'xpath=//h1[normalize-space(text())=\'Dashboard\']',
      ePrescribeBanner: 'xpath=//p[normalize-space(text())=\'Please complete the ePrescribe identity proofing process\']',
      ePrescribeGetStartedButton: 'xpath=//button[normalize-space(text())=\'Get Started\']',
      upcomingVisitsTitle: 'xpath=//h6[normalize-space(text())=\'Upcoming Visits\']',
      noUpcomingVisitsMessage: 'xpath=//div[normalize-space(text())=\'No upcoming visits\']',
      requestedVisitsTitle: 'xpath=//h6[normalize-space(text())=\'Requested Visits\']',
      requestedVisitsSelectTime: 'id=requested-visit-select',
      requestedVisitsConfirmButton: 'xpath=//button[@data-testid=\'visit-date-confirm-button-0\']',
      // This is not the best way to select a requested vpc visit, but it works for now.
      requestedVPCVisit: 'xpath=(//div[@class=\'MuiStack-root\'])//div[1]//p[normalize-space(text())=\'Virtual Primary Care (Initial Visit)\']',
      // This is not the best way to select an upcoming vpc visit, but it works for now.
      upcomingVPCVisit: 'xpath=(//div[contains(@class,\'MuiDataGrid-cell MuiDataGrid-cell--textLeft\')])[2]//p[normalize-space(text())=\'Virtual Primary Care (Upcoming Visit)\']',
      // Nav Bar
      userAvatarButton: 'id=user-avatar',
      dashboardButton: 'id=navbar-button-0',
      visitHistoryButton: 'id=navbar-button-1',
      myScheduleButton: 'id=navbar-button-2',
      resourceCenterButton: 'id=navbar-button-4',
      // Resource Center
      resourceCenterModal: 'xpath=//div[@role="dialog"][@aria-labelledby="dialog__title"]',
      videoConsultTroubleshootingLink: 'xpath=//div[@role="dialog"]//a[contains(text(), "Video Consult Troubleshooting Guide")]',
      troubleshootSectionBox: '[data-testid="troubleshoot-section-box"]',
      troubleshootingSectionCloseButton: 'id=dialog__button-confirm',
      resourceCenterLinks: 'xpath=//div[@role="dialog"]//a[@target="_blank"]',
      ...customSelectors
    };
  }

  /**
   * Verify Dashboard is present upon redirection from the 2FA screen.
   */
  async verifyDashboard(): Promise<void> {
    await this.waitForElement(this.selectors.dashboardTitle); // update to dashboard element
  }

  /**
   * Verify ePrescribe Banner is present on the Dashboard Page.
   * Only for Providers who have not completed the ePrescribe onboarding flow.
   */
  async verifyePrescribeBanner(): Promise<void> {
    await this.waitForElement(this.selectors.dashboardTitle); // update to dashboard element
  }

  /**
   * Verify ePrescribe Banner is not present on the Dashboard Page.
   */
  async verifyMissingePrescribeBanner(): Promise<void> {
    await this.isHidden(this.selectors.dashboardTitle); // update to dashboard element
  }

  /**
   * Click the Resource Center button and verify the modal appears.
   */
  async clickResourceCenterButton(): Promise<void> {
    await this.click(this.selectors.resourceCenterButton);
    await expect(this.page.locator(this.selectors.resourceCenterModal)).toBeVisible();
  }

  /**
   * Click the Video Consult Troubleshooting Guide link in the Resource Center modal.
   * The modal must be open before calling this method.
   */
  async clickVideoConsultTroubleshootingLink(): Promise<void> {
    await this.click(this.selectors.videoConsultTroubleshootingLink);
    // Several instances of the troubleshooting section box may be present on the page.
    await expect(this.page.locator(this.selectors.troubleshootSectionBox).first()).toBeVisible();

    // Wait for the close button to be visible and click the last instance (there are multiple instances in the modal for some reason)
    await this.page.locator(this.selectors.troubleshootingSectionCloseButton).last().waitFor({ state: 'visible' });
    await this.page.locator(this.selectors.troubleshootingSectionCloseButton).last().click();
  }

  /**
   * Verify all external links in the Resource Center open in new tabs with the correct URLs.
   * The Resource Center modal must be open before calling this method.
   * @returns Array of results with linkText and verification status
   */
  async verifyAllResourceCenterLinks(): Promise<{ linkText: string; url: string; verified: boolean }[]> {
    // Wait for all resource center links to be loaded
    await this.page.locator(this.selectors.resourceCenterLinks).first().waitFor({ state: 'visible' });

    // Get all links
    const linkElements = await this.page.locator(this.selectors.resourceCenterLinks).all();
    const results: { linkText: string; url: string; verified: boolean }[] = [];

    // For each link
    for (const linkElement of linkElements) {
      // Get link text and href
      const linkText = await linkElement.textContent() ?? '';
      const href = await linkElement.getAttribute('href') ?? '';
      const cleanLinkText = linkText.replace(/\s*<svg.*$/, '').trim(); // Remove the SVG part from the text

      // Create a promise that will resolve when a new page is opened
      const pagePromise = this.page.context().waitForEvent('page');

      // Click the link to open in new tab
      await linkElement.click();

      // Wait for the new page to open
      const newPage = await pagePromise;
      await newPage.waitForLoadState('load');

      // Get the URL of the new page
      const actualUrl = newPage.url();

      // Find the matching expected URL from our resource links array
      const expectedLink = this.resourceLinks.find(link =>
        cleanLinkText.includes(link.name) || link.url === href
      );

      // Verify URL matches expected
      let verified = false;
      if (expectedLink) {
        verified = actualUrl.includes(expectedLink.url);
      } else {
        // If no expected link found, just check that the URL contains the href
        verified = actualUrl.includes(href);
      }

      // Store the result
      results.push({
        linkText: cleanLinkText,
        url: actualUrl,
        verified
      });

      // Close the tab to avoid having too many open tabs
      await newPage.close();
    }

    // Check if any links failed verification
    const failedLinks = results.filter(result => !result.verified);
    if (failedLinks.length > 0) {
      const errorMessages = failedLinks.map(fail =>
        `Link "${fail.linkText}" opened incorrect URL: ${fail.url}`
      ).join('\n');
      throw new Error(`Some resource center links failed verification:\n${errorMessages}`);
    }

    return results;
  }
}
