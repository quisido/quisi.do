import { GetErrorCode } from '@quisido/csp-shared';
import { type Attributes, type ReactElement, useEffect, useState } from 'react';
import Emoji from '../../components/emoji.js';
import useEffectEvent from '../../hooks/use-effect-event.js';
import useEmit from '../../hooks/use-emit/index.js';
import useAsyncState from '../../modules/use-async-state/index.js';
import type ReportBody from '../../types/content-security-policy-report-body.js';
import mapPropsToElement from '../../utils/map-props-to-element.js';
import validateString from '../../utils/validate-string.js';
import type ContentSecurityPolicyGroup from './content-security-policy-group.js';
import ContentSecurityPolicyListItem, {
  type ContentSecurityPolicyListItemProps,
} from './content-security-policy-list-item.js';
import styles from './content-security-policy.module.scss';
import mapReportBodiesToContentSecurityPolicyGroups from './map-report-bodies-to-content-security-policy-groups.js';
import { Region } from '../../design-systems/template/index.js';
import LoadingIcon from '../../components/loading-icon.js';

interface ErrorResponse {
  readonly code: GetErrorCode;
}

type CspResponse = ErrorResponse | readonly ReportBody[];

const DECREMENT = -1;
const LIST_CLASS_NAME: string = validateString(styles['list']);
const NONE = 0;
const ORIGIN: string = validateString(import.meta.env.CSP_ORIGIN);
const REQUEST_INFO = `${ORIGIN}/1/?key=demo-get`;

// Technical debt: Validate that the `code` property is `GetErrorCode`.
const isErrorResponse = (value: CspResponse): value is ErrorResponse =>
  !Array.isArray(value);

const mapContentSecurityPolicyListItemPropsToElement = mapPropsToElement(
  ContentSecurityPolicyListItem,
);

export default function ContentSecurityPolicy(): ReactElement {
  // Contexts
  const emit = useEmit();

  // States
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const { data, error, initiated, loading, request } =
    useAsyncState<CspResponse>({
      onError(): void {
        emit('ContentSecurityPolicyError', {
          projectId: 1,
        });
      },
    });

  // Effects
  const requestEvent = useEffectEvent(request);
  useEffect((): undefined => {
    void requestEvent(async (): Promise<CspResponse> => {
      const response = await window.fetch(REQUEST_INFO);

      // Technical debt: Validate this on the client.
      return (await response.json()) as CspResponse;
    });
  }, []);

  if (!initiated || loading) {
    return (
      <Region heading="Content Security Policy">
        <LoadingIcon /> Loading
      </Region>
    );
  }

  if (typeof error !== 'undefined') {
    return <Region heading="Content Security Policy">{error}</Region>;
  }

  if (isErrorResponse(data)) {
    switch (data.code) {
      case GetErrorCode.InvalidDatabaseProjectRow:
        return (
          <Region heading="Content Security Policy">
            Invalid database project row
          </Region>
        );

      case GetErrorCode.InvalidKey:
        return <Region heading="Content Security Policy">Invalid key</Region>;

      case GetErrorCode.MissingKey:
        return <Region heading="Content Security Policy">Missing key</Region>;

      default:
        return (
          <Region heading="Content Security Policy">
            Unknown error code: {data.code}
          </Region>
        );
    }
  }

  if (data.length === NONE) {
    return (
      <Region heading="Content Security Policy">
        There are no reports of Content Security Policy violations.{' '}
        <Emoji>🎉</Emoji>
      </Region>
    );
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
      arr[index + DECREMENT]?.disposition;

    const previousEffectiveDirective: string | undefined =
      arr[index + DECREMENT]?.effectiveDirective;

    return {
      ...group,
      disposition,
      effectiveDirective,
      expanded: key === expandedKey,
      firstDisposition: disposition !== previousDisposition,
      firstEffectiveDirective:
        effectiveDirective !== previousEffectiveDirective,
      key,
      onToggle(): void {
        setExpandedKey((oldExpandedKey: string | null): string | null => {
          if (oldExpandedKey === key) {
            return null;
          }
          return key;
        });
      },
      originPathname,
    };
  };

  const props: readonly (Required<Attributes> &
    ContentSecurityPolicyListItemProps)[] = groups.map(mapGroupToProps);
  return (
    <Region heading="quisi.do's Content Security Policy">
      <ul className={LIST_CLASS_NAME} data-nosnippet>
        {props.map(mapContentSecurityPolicyListItemPropsToElement)}
      </ul>
    </Region>
  );
}
