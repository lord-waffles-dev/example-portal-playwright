import { ICustomWorld } from '../../support/custom-world';
import { Then, When } from '@cucumber/cucumber';
import { PageFactory } from '../../pages';

/**
 * Step definitions for the Lab Order Requests page.
 * These steps use the LabOrderRequestsPage page object to interact with the Lab Order Requests page.
 */
When('I am on the Lab Order Requests page', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getDashboardPage(page);
  await DashboardPage.clickLabOrderRequestsButton();
});

Then('I should see the Cologuard Lab Orders data grid', async function (this: ICustomWorld) {
  // The Cologuard section is the initial section that loads here
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);

  // Wait for the Lab Orders DataGrid to appear and verify it's loaded
  await LabOrderRequestsPage.verifyLabOrdersPageLoaded();

  // Attach a message to the test report
  this.attach('Cologuard Lab Orders data grid is visible', 'text/plain');
});

Then('I should see the Galleri Lab Orders data grid', async function (this: ICustomWorld) {
  // The Galleri data appears after clicking the button
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);

  await LabOrderRequestsPage.clickGalleriTab();

  // Wait for the Lab Orders DataGrid to appear and verify it's loaded
  await LabOrderRequestsPage.verifyLabOrdersPageLoaded();

  // Attach a message to the test report
  this.attach('Cologuard Lab Orders data grid is visible', 'text/plain');
});
