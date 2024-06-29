import { type ReactElement } from "react";
import useTheme from "../../hooks/use-theme.js";
import validateString from "../../utils/validate-string.js";
import ContentSecurityPolicyDispositionIcon from "./content-security-policy-disposition-icon.jsx";
import type ContentSecurityPolicyGroup from './content-security-policy-group.js';
import styles from './content-security-policy-list-item.module.scss';
import type ContentSecurityPolicyReport from "./content-security-policy-report.js";
import mapContentSecurityPolicyReportToListItemElement from './map-content-security-policy-report-to-list-item-element.jsx';

interface Props extends ContentSecurityPolicyGroup {
  readonly expanded: boolean;
  readonly firstOfType: boolean;
  readonly onToggle: VoidFunction;
}

const COLLAPSED_CLASS_NAME: string = validateString(styles['collapsed']);
const EXPANDED_CLASS_NAME: string = validateString(styles['expanded']);
const EXPANDO_CLASS_NAME: string = validateString(styles['expando']);
const LIST_ITEM_CLASS_NAME: string = validateString(styles['listItem']);
const NONE = 0;
const REPORTS_COUNT_CLASS_NAME: string = validateString(styles['reportsCount']);
const SINGLE = 1;

const DISPOSITION_ICON_CLASS_NAME: string = validateString(
  styles['dispositionIcon'],
);

const EFFECTIVE_DIRECTIVE_CLASS_NAME: string = validateString(
  styles['effectiveDirective'],
);

const NOT_FIRST_OF_TYPE_CLASS_NAME: string = validateString(
  styles['notFirstOfType'],
);

const reduceUrlsToCount = (
  sum: number,
  { count }: ContentSecurityPolicyReport,
): number => sum + count;

const mapUrlsToCount = (
  urls: readonly ContentSecurityPolicyReport[],
): number =>
  urls.reduce(reduceUrlsToCount, NONE);

export default function ContentSecurityPolicyListItem({
  disposition,
  effectiveDirective,
  expanded,
  firstOfType,
  onToggle,
  originPathname,
  urls,
}: Props): ReactElement {
  // Contexts
  const { displayFontFamily } = useTheme();

  // States
  const getClassName = (): string => {
    const classNames: string[] = [LIST_ITEM_CLASS_NAME];

    if (expanded) {
      classNames.push(EXPANDED_CLASS_NAME);
    } else {
      classNames.push(COLLAPSED_CLASS_NAME);
    }

    if (!firstOfType) {
      classNames.push(NOT_FIRST_OF_TYPE_CLASS_NAME);
    }

    return classNames.join(' ');
  }

  const className: string = getClassName();
  const count: number = mapUrlsToCount(urls);
  return (
    <li className={className}>
      <button
        className={EXPANDO_CLASS_NAME}
        onClick={onToggle}
      >
        <ContentSecurityPolicyDispositionIcon
          className={DISPOSITION_ICON_CLASS_NAME}
        >
          {disposition}
        </ContentSecurityPolicyDispositionIcon>{' '}
        <span className={EFFECTIVE_DIRECTIVE_CLASS_NAME}>
          {effectiveDirective}
        </span>{' '}
        {originPathname}{' '}
        {
          count > SINGLE &&
          <span
            className={REPORTS_COUNT_CLASS_NAME}
            style={{
              fontFamily: `"Cairo Play", ${displayFontFamily}`,
            }}
          >
            &times;{count}
          </span>
        }
      </button>
      <ul>
        {urls.map(mapContentSecurityPolicyReportToListItemElement)}
      </ul>
    </li>
  );
}
