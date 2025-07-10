import { Page } from '@playwright/test';

export async function setupNetworkCapture(page: Page): Promise<void> {
  await page.route('**/*', (route) => {
    const request = route.request();
    const method = request.method();
    const url = request.url();

    console.log(`Request: ${method} ${url}`);

    if (method === 'POST') {
      const headers = request.headers();
      let postData = request.postData();

      try {
        if (postData && (
          headers['content-type']?.includes('application/json')
          || postData.startsWith('{')
          || postData.startsWith('[')
        )) {
          postData = JSON.parse(postData);
        }
      } catch (e) {
        // If parsing fails, keep the original string format
      }

      console.log({
        type: 'REQUEST',
        method,
        url,
        headers,
        body: postData
      });
    }

    void route.continue();
  });

  page.on('response', async (response) => {
    const request = response.request();
    const url = request.url();

    if (url.includes('/api/')) {
      try {
        const responseBody = await response.json().catch(() => null);

        console.log({
          url,
          method: request.method(),
          status: response.status(),
          headers: response.headers(),
          body: responseBody
        });

        // Optionally save to a file for later reference
        // await fs.writeFile(...);
      } catch (error) {
        console.error(`Error capturing response for ${url}:`, error);
      }
    }
  });
}
