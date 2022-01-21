const MISSING_NYC_REPORT_DIR_ERROR = new Error(
  'Expected `NYC_REPORT_DIR` environment variable to be set.',
);

const getReportDir = () => {
  const reportDir = process.env.NYC_REPORT_DIR;

  if (!reportDir) {
    throw MISSING_NYC_REPORT_DIR_ERROR;
  }

  return reportDir;
};

module.exports = {
  all: true,
  cache: true,
  'check-coverage': false,
  extension: ['.js', '.jsx', '.ts', '.tsx'],
  include: 'src/**',
  'report-dir': getReportDir(),
  reporter: ['clover', 'json', 'lcov', 'text'],
  'skip-empty': false,
  'skip-full': false,
  exclude: [
    'src/**/*.d.ts',
    'src/**/*.e2e.ts',
    'src/**/*.stories.{ts,tsx}',
    'src/**/*.test.{ts,tsx}',
  ],
};
