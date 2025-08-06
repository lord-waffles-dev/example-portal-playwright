import { Page } from '@playwright/test';

/**
* Logs detailed information about an API call
* @param method HTTP method (GET, POST, PUT, etc.)
* @param url Full URL of the API endpoint
* @param headers Request headers
* @param params Query parameters (for GET/PUT requests)
* @param data Request body (for POST/PUT requests)
*/
export function logApiCall(
  method: string,
  url: string,
  headers: Record<string, string>,
  params?: Record<string, string | number | boolean | string[] | number[]>,
  data?: Record<string, unknown> | unknown[] | string | number | boolean | object
): void {
  console.log('\n----- API CALL -----');
  console.log(`${method} ${url}`);

  if (params) {
    console.log('Query Parameters:', JSON.stringify(params, null, 2));
    // Append query parameters to URL for logging the full request URL
    const queryString = new URLSearchParams(
      Object.entries(params).flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => [key, String(v)]);
        }
        return [[key, String(value)]];
      })
    ).toString();
    console.log(`Full URL: ${url}${url.includes('?') ? '&' : '?'}${queryString}`);
  }

  console.log('Headers:', JSON.stringify(headers, null, 2));

  if (data) {
    console.log('Request Body:', JSON.stringify(data, null, 2));
  }
  console.log('--------------------\n');
}

export async function setupNetworkCapture(page: Page): Promise<void> {
  await page.route('**/*', (route) => {
    const request = route.request();
    const method = request.method();
    const url = request.url();

    console.log(`Request: ${method} ${url}`);

    if (method === 'POST') {
      const headers = request.headers();
      let postData: string | Record<string, unknown> | null = request.postData();

      try {
        if (postData && (
          headers['content-type']?.includes('application/json')
          || postData.startsWith('{')
          || postData.startsWith('[')
        )) {
          postData = JSON.parse(postData) as Record<string, unknown>;
        }
      } catch (e) {
        // If parsing fails, keep the original string format
        console.debug('Failed to parse JSON:', e);
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
        const responseBody = await response.json().catch(() => null) as Record<string, unknown> | null;

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
