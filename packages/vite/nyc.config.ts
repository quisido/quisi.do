import getReportDir from './src/test/utils/get-nyc-report-dir.js';

export default {
  'report-dir': getReportDir(),
} satisfies Record<string, unknown>;
