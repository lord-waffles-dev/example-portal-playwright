const getWorldParams = () => {
  const params = {
    foo: 'bar'
  };

  return params;
};

const config = {
  import: ['src/**/*.ts'],
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
  },
  worldParameters: getWorldParams()
};

export default config;
