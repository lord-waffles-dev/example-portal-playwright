import { test } from '@playwright/test';
import { setupNetworkCapture } from '../../src/utils/networkCapture';
test('Manual exploration with network capture', async ({ page }) => {
  await setupNetworkCapture(page);
  await page.goto('https://qa-practice.razvanvancea.ro/');
  await page.pause();
});
