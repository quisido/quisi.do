'use client';

import { useEffect, useState, type ReactElement } from "react";
import LoadingIcon from "../../modules/quisi/loading-icon.jsx";
import Section from "../../modules/quisi/section.jsx";
import useAsyncState from "../../modules/use-async-state/index.js";
import type ReportBody from '../../types/content-security-policy-report-body.js';
import validateString from "../../utils/validate-string.js";
import type ContentSecurityPolicyGroup from './content-security-policy-group.js';
import ContentSecurityPolicyListItem from "./content-security-policy-list-item.jsx";
import styles from './content-security-policy.module.scss';
import mapReportBodiesToContentSecurityPolicyGroups from './map-report-bodies-to-content-security-policy-groups.js';

interface ErrorResponse {
  readonly code: 1 | 2 | 3;
}

type CspResponse = ErrorResponse | readonly ReportBody[];

const LIST_CLASS_NAME: string = validateString(styles['list']);

const isErrorResponse = (value: CspResponse): value is ErrorResponse =>
  !Array.isArray(value);

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
      const response = await window.fetch('https://csp.quisi.do/1/?key=demo');
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
    return (
      <Section header="Content Security Policy">
        Error code #{data.code}
      </Section>
    );
  }

  const groups: readonly ContentSecurityPolicyGroup[] =
    mapReportBodiesToContentSecurityPolicyGroups(data);

  const mapGroupToElement = (
    {
      disposition,
      effectiveDirective,
      originPathname,
      urls,
    }: ContentSecurityPolicyGroup,
    index: number,
    arr: readonly ContentSecurityPolicyGroup[],
  ): ReactElement => {
    const key = `${disposition} ${effectiveDirective} ${originPathname}`;
    const previousEffectiveDirective: string | undefined =
      arr[index - 1]?.effectiveDirective;

    const firstOfType: boolean =
      effectiveDirective !== previousEffectiveDirective;

    const handleToggle = (): void => {
      setExpandedKey((oldExpandedKey: string | null): string | null => {
        if (oldExpandedKey === key) {
          return null;
        }
        return key;
      });
    };

    return (
      <ContentSecurityPolicyListItem
        disposition={disposition}
        effectiveDirective={effectiveDirective}
        expanded={key === expandedKey}
        firstOfType={firstOfType}
        key={key}
        onToggle={handleToggle}
        originPathname={originPathname}
        urls={urls}
      />
    );
  };

  return (
    <Section header="Content Security Policy">
      <ul className={LIST_CLASS_NAME} data-nosnippet>
        {groups.map(mapGroupToElement)}
      </ul>
    </Section>
  );
}
