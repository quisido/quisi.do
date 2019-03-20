export default function getNycReportDir(): string {
  const dir: string | undefined = process.env['NYC_REPORT_DIR'];

  if (typeof dir === 'undefined' || dir === '') {
    return 'coverage';
  }

  return dir;
}
