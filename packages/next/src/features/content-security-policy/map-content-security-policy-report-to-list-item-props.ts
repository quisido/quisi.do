import type { Attributes } from 'react';
import type ContentSecurityPolicyReport from './content-security-policy-report.js';

export default function mapContentSecurityPolicyReportToListItemProps({
  columnNumber,
  count,
  lineNumber,
  sourceFile,
}: ContentSecurityPolicyReport): Required<Attributes> &
  ContentSecurityPolicyReport {
  const getKey = (): string | null => {
    // Assumption: There will only ever be one item with a null `sourceFile`.
    if (sourceFile === null) {
      return null;
    }

    return `${sourceFile} ${lineNumber} ${columnNumber}`;
  };

  const key: string | null = getKey();
  return {
    columnNumber,
    count,
    key,
    lineNumber,
    sourceFile,
  };
}
