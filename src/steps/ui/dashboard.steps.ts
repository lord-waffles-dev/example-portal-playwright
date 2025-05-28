import { ICustomWorld } from '../../support/custom-world';
import { Then, When } from '@cucumber/cucumber';
import { PageFactory } from '../../pages';

/**
 * Step definitions for the Provider Portal Dashboard.
 * These steps use the DashboardPage page object to interact with the dashboard.
 */
When('I should see the dashboard page', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyDashboard();
});

Then('I should see the ePrescribe banner', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyePrescribeBanner();
});

Then('I should not see the ePrescribe banner', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyMissingePrescribeBanner();
});

When('I select the Resource Center link', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.clickResourceCenterButton();
});

When(/^I verify the Video Consult Troubleshooting Guide opens a modal$/, async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.clickVideoConsultTroubleshootingLink();
});

Then(/^I verify all other links within the Resource Center modal$/, async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);

  // Verify all resource center links open in new tabs with correct URLs
  const linkResults = await DashboardPage.verifyAllResourceCenterLinks();

  // Add verification results to the test report
  this.attach(`Verified ${linkResults.length} resource center links successfully`, 'text/plain');
  for (const result of linkResults) {
    this.attach(`Link "${result.linkText}" opened URL: ${result.url}`, 'text/plain');
  }
});
// Cleanup with an Outline
When(`I should see no requested visits`, async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyEmptyRequestedVisits();
});
// Cleanup with an Outline
When(`I should see a requested vpc visit`, async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyRequestedVPCVisit();
});
// Cleanup with an Outline
When(`I should see no upcoming visits`, async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyEmptyUpcomingVisits();
});
// Cleanup with an Outline
When(`I should see an upcoming vpc visit`, async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.verifyUpcomingVPCVisit();
});
