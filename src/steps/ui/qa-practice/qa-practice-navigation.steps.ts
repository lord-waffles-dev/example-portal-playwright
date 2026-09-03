import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../../support/custom-world';
import { PageFactory } from '../../../pages';

Given('I navigate to the QA Practice home page', async function (this: ICustomWorld) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.navigateToHome();
});

When('I open the QA Practice page {string}', async function (this: ICustomWorld, path: string) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.openPage(path);
});

Then('I should be on the QA Practice page {string}', async function (this: ICustomWorld, path: string) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.verifyPath(path);
});

Then('I should see the QA Practice heading {string}', async function (this: ICustomWorld, heading: string) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.verifyHeading(heading);
});