import { filterByDefined } from 'fmrs';
import type ReportBody from '../types/report-body.js';
import mapObjectToValues from './map-object-to-values.js';

export default function mapReportBodyToValues(
  report: ReportBody,
): readonly (number | string)[] {
  return mapObjectToValues<keyof ReportBody, number | string | undefined>(
    report,
  ).filter(filterByDefined);
}
