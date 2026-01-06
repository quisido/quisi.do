import getReportDir from './test/get-nyc-report-dir.js';

const CONFIG: Record<string, unknown> = {
  'report-dir': getReportDir(),
};

export default CONFIG;
