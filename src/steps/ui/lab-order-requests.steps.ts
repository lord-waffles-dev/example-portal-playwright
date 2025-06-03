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
  await LabOrderRequestsPage.waitForLabOrdersDataGrid();
  await LabOrderRequestsPage.clickApprovedOrders();
});

Then('I should see the Galleri Lab Orders data grid', async function (this: ICustomWorld) {
  // The Galleri data appears after clicking the button
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);

  await LabOrderRequestsPage.clickGalleriTab();
  await LabOrderRequestsPage.clickApprovedOrders();
});

When(/^I enter the search term "([^"]*)"$/, async function (this: ICustomWorld, searchTerm: string) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.searchInGrid(searchTerm);
});

Then(/^I get the search result of "([^"]*)" in Pending requests$/, async function (this: ICustomWorld, expectedResult: string) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.clickPendingRequests();
  await LabOrderRequestsPage.verifySearchResult(expectedResult);
});

Then(/^I get the search result of "([^"]*)" in Approved orders$/, async function (this: ICustomWorld, expectedResult: string) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.clickApprovedOrders();
  await LabOrderRequestsPage.verifySearchResult(expectedResult);
});

When(/^I click the Galleri tab$/, async function (this: ICustomWorld) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.clickGalleriTab();
});

When(/^I select the Review button the the Cologuard page for Pending Requests$/, async function (this: ICustomWorld) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.clickCologuardTab();
  await LabOrderRequestsPage.waitForLabOrdersDataGrid();
  await LabOrderRequestsPage.clickReviewButton();
});

When(/^I verify that the Cologuard Request modal appears$/, async function (this: ICustomWorld) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.isCologuardRequestVisible();
  await LabOrderRequestsPage.clickCancelButton();
});

Then(/^I verify that the Galleri Request modal appears$/, async function (this: ICustomWorld) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);
  await LabOrderRequestsPage.clickGalleriTab();
  await LabOrderRequestsPage.waitForLabOrdersDataGrid();
  await LabOrderRequestsPage.clickReviewButton();
  await LabOrderRequestsPage.isGalleriRequestVisible();
  await LabOrderRequestsPage.clickCancelButton();
});

When(/^I click the "([^"]*)" tab$/, async function (this: ICustomWorld, labType: string) {
  const page = this.page!;
  const LabOrderRequestsPage = PageFactory.getLabOrderRequestsPage(page);

  if (labType === 'Galleri') {
    await LabOrderRequestsPage.clickGalleriTab();
  } else if (labType === 'Cologuard') {
    await LabOrderRequestsPage.clickCologuardTab();
  } else {
    throw new Error(`Unsupported lab type: ${labType}`);
  }
});
