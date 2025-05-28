import { ICustomWorld } from '../../support/custom-world';
import { When } from '@cucumber/cucumber';
import { PageFactory } from '../../pages';

/**
 * Step definitions for the Provider Portal Visits.
 * These steps use the VisitsPage page object to interact with the dashboard.
 */
When('I am on the Visit page', async function (this: ICustomWorld) {
  const page = this.page!;
  const DashboardPage = PageFactory.getVisitsPage(page);
  await DashboardPage.verifyVisitsPage();
});
