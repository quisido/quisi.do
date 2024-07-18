'use client';

import { GetErrorCode } from '@quisido/csp-shared';
import { useEffect, useState, type Attributes, type ReactElement } from 'react';
import LoadingIcon from "../../modules/quisi/loading-icon.jsx";
import Section from "../../modules/quisi/section.jsx";
import useAsyncState from "../../modules/use-async-state/index.js";
import type ReportBody from '../../types/content-security-policy-report-body.js';
import mapPropsToElement from "../../utils/map-props-to-element.jsx";
import validateString from "../../utils/validate-string.js";
import type ContentSecurityPolicyGroup from './content-security-policy-group.js';
import ContentSecurityPolicyListItem, {
  type ContentSecurityPolicyListItemProps,
} from './content-security-policy-list-item.jsx';
import styles from './content-security-policy.module.scss';
import mapReportBodiesToContentSecurityPolicyGroups from './map-report-bodies-to-content-security-policy-groups.js';

interface ErrorResponse {
  readonly code: number;
}

type CspResponse = ErrorResponse | readonly ReportBody[];

const LIST_CLASS_NAME: string = validateString(styles['list']);
const ORIGIN: string = validateString(process.env['CSP_ORIGIN']);
const REQUEST_INFO = `${ORIGIN}/1/?key=demo-get`;

const isErrorResponse = (value: CspResponse): value is ErrorResponse =>
  !Array.isArray(value);

const mapContentSecurityPolicyListItemPropsToElement =
  mapPropsToElement(ContentSecurityPolicyListItem);

export default function ContentSecurityPolicy(): ReactElement {
  // States
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const {
    data,
    error,
    initiated,
    loading,
    request,
  } = useAsyncState<CspResponse>();

  // Effects
  useEffect((): void => {
    request(async (): Promise<CspResponse> => {
      const response = await window.fetch(REQUEST_INFO);
      return await response.json();
    });
  }, [request]);

  if (!initiated || loading) {
    return (
      <Section header="Content Security Policy">
        <LoadingIcon /> Loading
      </Section>
    );
  }

  if (typeof error !== 'undefined') {
    return (
      <Section header="Content Security Policy">
        {error}
      </Section>
    );
  }

  if (isErrorResponse(data)) {
    switch (data.code) {
      case GetErrorCode.InvalidDatabaseProjectRow:
        return (
          <Section header="Content Security Policy">
            Invalid database project row
          </Section>
        );

      case GetErrorCode.InvalidKey:
        return (
          <Section header="Content Security Policy">
            Invalid key
          </Section>
        );

      case GetErrorCode.MissingKey:
        return (
          <Section header="Content Security Policy">
            Missing key
          </Section>
        );

      default:
        return (
          <Section header="Content Security Policy">
            Unknown error code: {data.code}
          </Section>
        );
    }
  }

  const groups: readonly ContentSecurityPolicyGroup[] =
    mapReportBodiesToContentSecurityPolicyGroups(data);

  const mapGroupToProps = (
    {
      disposition,
      effectiveDirective,
      originPathname,
      ...group
    }: ContentSecurityPolicyGroup,
    index: number,
    arr: readonly ContentSecurityPolicyGroup[],
  ): Required<Attributes> & ContentSecurityPolicyListItemProps => {
    const key = `${disposition} ${effectiveDirective} ${originPathname}`;
    const previousDisposition: string | undefined =
      arr[index - 1]?.disposition;
    const previousEffectiveDirective: string | undefined =
      arr[index - 1]?.effectiveDirective;

    return {
      ...group,
      disposition,
      effectiveDirective,
      expanded: key === expandedKey,
      firstDisposition: disposition !== previousDisposition,
      key,
      originPathname,

      firstEffectiveDirective:
        effectiveDirective !== previousEffectiveDirective,

      onToggle(): void {
        setExpandedKey((oldExpandedKey: string | null): string | null => {
          if (oldExpandedKey === key) {
            return null;
          }
          return key;
        });
      },
    };
  };

  const props: readonly (Required<Attributes> & ContentSecurityPolicyListItemProps)[] =
    groups.map(mapGroupToProps);
  return (
    <Section header="Content Security Policy">
      <ul className={LIST_CLASS_NAME} data-nosnippet>
        {props.map(mapContentSecurityPolicyListItemPropsToElement)}
      </ul>
    </Section>
  );
}
