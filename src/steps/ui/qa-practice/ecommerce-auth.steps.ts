import { Given, Then, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../../support/custom-world';
import { PageFactory } from '../../../pages';

Given(
  'I login to QA Practice ecommerce with email {string} and password {string}',
  async function (this: ICustomWorld, email: string, password: string) {
    const page = this.page!;
    const qaPracticePage = PageFactory.getQaPracticePage(page);
    await qaPracticePage.loginToEcommerce(email, password);
    await qaPracticePage.verifyEcommerceLoginSuccess();
  }
);

Then('I should be logged in to QA Practice ecommerce', async function (this: ICustomWorld) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.verifyEcommerceLoginSuccess();
});

When('I add a product to the QA Practice ecommerce cart', async function (this: ICustomWorld) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.addFirstAvailableProductToCart();
});

Then('the QA Practice ecommerce cart should contain items', async function (this: ICustomWorld) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.verifyCartHasItems();
});

When(
  'I proceed to checkout and submit order with phone {string} street {string} city {string} country {string}',
  async function (this: ICustomWorld, phone: string, street: string, city: string, country: string) {
    const page = this.page!;
    const qaPracticePage = PageFactory.getQaPracticePage(page);
    await qaPracticePage.proceedToCheckout();
    await qaPracticePage.fillShippingDetails(phone, street, city, country);
    await qaPracticePage.submitOrder();
  }
);

Then(
  'I should see a successful QA Practice ecommerce order message for street {string} city {string} country {string}',
  async function (this: ICustomWorld, street: string, city: string, country: string) {
    const page = this.page!;
    const qaPracticePage = PageFactory.getQaPracticePage(page);
    await qaPracticePage.verifyOrderSubmitted(street, city, country);
  }
);

When('I logout from QA Practice ecommerce', async function (this: ICustomWorld) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.logoutFromEcommerce();
});

Then('I should be logged out from QA Practice ecommerce', async function (this: ICustomWorld) {
  const page = this.page!;
  const qaPracticePage = PageFactory.getQaPracticePage(page);
  await qaPracticePage.verifyLoggedOutFromEcommerce();
});