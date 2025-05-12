export default function getNycReportDir(): string {
  const dir: string | undefined = import.meta.env.NYC_REPORT_DIR;

  if (typeof dir === 'undefined' || dir === '') {
    return 'coverage';
  }

  return dir;
}
