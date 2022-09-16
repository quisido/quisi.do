const getReportDir = () => {
  const nycReportDir = process.env.NYC_REPORT_DIR;
  if (nycReportDir) {
    return nycReportDir;
  }
  return 'coverage';
};

module.exports = {
  'report-dir': getReportDir(),
};
