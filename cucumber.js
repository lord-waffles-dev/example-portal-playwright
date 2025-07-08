const config = {
  import: ['src/**/*.ts', '!src/playwright-tests/**/*.ts', '!src/**/*.test.ts', '!tests/**/*.ts'],
  format: [
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar'
  ],
  formatOptions: {
    snippetInterface: 'async-await',
    theme: 'cucumber',
    // Enable image display
    displayAttachments: true
  }
};

export default config;
