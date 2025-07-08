import { test } from '@playwright/test';
import { setupNetworkCapture } from '../utils/networkCapture';
test('Manual exploration with network capture', async ({ page }) => {
  await setupNetworkCapture(page);
  await page.goto('https://cerebro-staging.recurohealth.com/login.aspx');
  await page.pause();
});