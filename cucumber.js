const config = {
  import: ['src/**/*.ts', '!src/playwright-tests/**/*.ts', '!src/**/*.test.ts', '!tests/**/*.ts'],
  format: [
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar'
  ],
  formatOptions: {
    snippetInterface: 'async-await',
    theme: 'cucumber',
    displayAttachments: true
  }
};

export default config;
