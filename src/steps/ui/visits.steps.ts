import { ICustomWorld } from '../../support/custom-world';
import { When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../../pages';

/**
 * Step definitions for the Provider Portal Visits.
 * These steps use the VisitsPage page object to interact with the dashboard.
 */
Then('I should be on the Visit page', async function (this: ICustomWorld) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.verifyVisitsPage();
});

When('I view the Patient Details card', async function (this: ICustomWorld) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.viewPatientDetailsCard();
});

When('I view the Visit Details card', async function (this: ICustomWorld) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.viewVisitDetailsCard();
});

Then('I should see the following patient information with correct values:', async function (this: ICustomWorld, dataTable) {
  const page = this.page!;
  const visitsPage = PageFactory.getVisitsPage(page);
  const expectedValues = dataTable.hashes();
  await visitsPage.verifyPatientInformation(expectedValues);
});

Then('I should see the following visit information with correct values:', async function (this: ICustomWorld, dataTable) {
  const page = this.page!;
  const visitsPage = PageFactory.getVisitsPage(page);
  const expectedValues = dataTable.hashes();
  await visitsPage.verifyVisitInformation(expectedValues);
});
