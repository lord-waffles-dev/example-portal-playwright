import { ICustomWorld } from '../../support/custom-world';
import { Then, When } from '@cucumber/cucumber';
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
  const VisitsPage = PageFactory.getVisitsPage(page);
  const expectedValues = dataTable.hashes();
  await VisitsPage.verifyPatientInformation(expectedValues);
});

Then('I should see the following visit information with correct values:', async function (this: ICustomWorld, dataTable) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  const expectedValues = dataTable.hashes();
  await VisitsPage.verifyVisitInformation(expectedValues);
});

When('I click on the {string} tab', async function (this: ICustomWorld, tab: string) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.selectVisitPageTabs(tab);
});

Then('I should see the {string} card', async function (this: ICustomWorld, card: string) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.viewVisitPageCards(card);
});

Then('I should see the {string} fields', async function (this: ICustomWorld, field: string) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.interactWithVisitNotesFields(field, { visible: true });
});

When('I enter {string} in the {string} field', async function (this: ICustomWorld, text: string, field: string) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.interactWithVisitNotesFields(field, { fillText: text }, text);
});

When('I check the {string} checkbox', async function (this: ICustomWorld, checkbox: string) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.checkVisitsPageCheckboxes(checkbox);
});

When('I click the Add diagnosis button', async function (this: ICustomWorld) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.selectAddDiagnosisButton();
});

When('I search for {string} in the diagnosis dropdown', async function (this: ICustomWorld, diagnosis: string) {
  const page = this.page!;
  const VisitsPage = PageFactory.getVisitsPage(page);
  await VisitsPage.selectDiagnosis(diagnosis);
});
