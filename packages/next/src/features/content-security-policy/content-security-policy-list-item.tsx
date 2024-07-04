import { type ReactElement } from "react";
import useTheme from "../../hooks/use-theme.js";
import validateString from "../../utils/validate-string.js";
import ContentSecurityPolicyDispositionIcon from "./content-security-policy-disposition-icon.jsx";
import type ContentSecurityPolicyGroup from './content-security-policy-group.js';
import styles from './content-security-policy-list-item.module.scss';
import type ContentSecurityPolicyReport from "./content-security-policy-report.js";
import mapContentSecurityPolicyReportToListItemElement from './map-content-security-policy-report-to-list-item-element.jsx';

export interface ContentSecurityPolicyListItemProps extends ContentSecurityPolicyGroup {
  readonly expanded: boolean;
  readonly firstDisposition: boolean;
  readonly firstEffectiveDirective: boolean;
  readonly onToggle: VoidFunction;
}

const COLLAPSED_CLASS_NAME: string = validateString(styles['collapsed']);
const EXPANDED_CLASS_NAME: string = validateString(styles['expanded']);
const EXPANDO_CLASS_NAME: string = validateString(styles['expando']);
const LIST_ITEM_CLASS_NAME: string = validateString(styles['listItem']);
const NONE = 0;
const NOT_FIRST_CLASS_NAME: string = validateString(styles['notFirst']);
const REPORTS_COUNT_CLASS_NAME: string = validateString(styles['reportsCount']);
const SINGLE = 1;

const DISPOSITION_ICON_CLASS_NAME: string = validateString(
  styles['dispositionIcon'],
);

const FIRST_EFFECTIVE_DIRECTIVE_CLASS_NAME: string = validateString(
  styles['firstEffectiveDirective'],
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
  firstDisposition,
  firstEffectiveDirective,
  onToggle,
  originPathname,
  urls,
}: ContentSecurityPolicyListItemProps): ReactElement {
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

    if (firstEffectiveDirective) {
      classNames.push(FIRST_EFFECTIVE_DIRECTIVE_CLASS_NAME);
    }

    return classNames.join(' ');
  };

  const getDispositionIconClassName = (): string => {
    const classNames: string[] = [DISPOSITION_ICON_CLASS_NAME];

    if (!firstDisposition) {
      classNames.push(NOT_FIRST_CLASS_NAME);
    }

    return classNames.join(' ');
  };

  const getEffectiveDirectiveClassName = (): string => {
    const classNames: string[] = [];

    if (!firstEffectiveDirective) {
      classNames.push(NOT_FIRST_CLASS_NAME);
    }

    return classNames.join(' ');
  };

  const className: string = getClassName();
  const count: number = mapUrlsToCount(urls);
  const dispositionIconClassName: string = getDispositionIconClassName();
  const effectiveDirectiveClassName: string = getEffectiveDirectiveClassName();
  return (
    <li className={className}>
      <button
        className={EXPANDO_CLASS_NAME}
        onClick={onToggle}
      >
        <ContentSecurityPolicyDispositionIcon
          className={dispositionIconClassName}
        >
          {disposition}
        </ContentSecurityPolicyDispositionIcon>{' '}
        <span className={effectiveDirectiveClassName}>
          {effectiveDirective}
        </span>{' '}
        <span>
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
        </span>
      </button>
      <ul>
        {urls.map(mapContentSecurityPolicyReportToListItemElement)}
      </ul>
    </li>
  );
}
