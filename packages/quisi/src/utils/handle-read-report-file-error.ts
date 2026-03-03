import mapToString from './map-to-string.js';

export default function handleReadReportFileError(err: unknown): string {
  return `An error occurred while trying to read the report file: ${mapToString(err)}`;
}
