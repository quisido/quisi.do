import type { ReactElement } from "react";
import ContentSecurityPolicyReportListItem from './content-security-policy-report-list-item.jsx';
import type ContentSecurityPolicyReport from './content-security-policy-report.js';

export default function mapContentSecurityPolicyReportToListItemElement({
  columnNumber,
  count,
  lineNumber,
  sourceFile,
}: ContentSecurityPolicyReport): ReactElement {
  const getKey = (): string | null => {
    // Assumption: There will only ever be one item with a null `sourceFile`.
    if (sourceFile === null) {
      return null;
    }

    return `${sourceFile} ${lineNumber} ${columnNumber}`;
  };

  const key: string | null = getKey();
  return (
    <ContentSecurityPolicyReportListItem
      columnNumber={columnNumber}
      count={count}
      key={key}
      lineNumber={lineNumber}
      sourceFile={sourceFile}
    />
  );
}
