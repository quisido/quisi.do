'use client';

import { useEffect, useState, type ReactElement } from "react";
import Emoji from "../components/emoji.jsx";
import EMPTY_ARRAY from "../constants/empty-array.js";
import Link from "../modules/quisi/link.jsx";
import LoadingIcon from "../modules/quisi/loading-icon.jsx";
import Section from "../modules/quisi/section.jsx";
import useAsyncState from "../modules/use-async-state/index.js";
import not from "../utils/not.js";
import sortEntriesByKey from "../utils/sort-entries-by-key.js";
import toggle from "../utils/toggle.js";
import validateString from "../utils/validate-string.js";
import styles from './content-security-policy.module.scss';

interface ErrorCspResponse {
  readonly code: 1 | 2 | 3;
}

interface ReportBody {
  readonly blockedURL: string | null;
  readonly columnNumber: number | null;
  readonly documentURL: string;
  readonly effectiveDirective: string;
  readonly lineNumber: number | null;
  readonly referrer: string | null;
  readonly sourceFile: string | null;
  readonly statusCode: number;

  // `disposition` should be 'enforce' | 'report'.
  readonly disposition: string;
}

interface GroupUrl extends Pick<
  ReportBody,
  | 'blockedURL'
  | 'columnNumber'
  | 'lineNumber'
  | 'sourceFile'
> {
  readonly count: number;
}

interface Group {
  readonly disposition: string;
  readonly effectiveDirective: string;
  readonly origin: string;
  readonly urls: readonly GroupUrl[];
}

type CspResponse = ErrorCspResponse | readonly ReportBody[];

const COLLAPSED_CLASS_NAME: string = validateString(styles['collapsed']);
const EXPANDED_CLASS_NAME: string = validateString(styles['expanded']);
const EXPANDO_CLASS_NAME: string = validateString(styles['expando']);
const LIST_CLASS_NAME: string = validateString(styles['list']);

const isErrorResponse = (value: CspResponse): value is ErrorCspResponse =>
  !Array.isArray(value);

const mapUrlToHref = (url: string | null): string | null => {
  if (url === null) {
    return null;
  }
  try {
    const { href } = new URL(url);
    return href;
  } catch (_err: unknown) {
    return null;
  }
};

const mapBlockedUrlToOrigin = (url: string | null): string => {
  if (url === null) {
    return '';
  }
  try {
    const { origin } = new URL(url);
    return origin;
  } catch (_err: unknown) {
    return url;
  }
};

const mapDataToGroups = (data: readonly ReportBody[]): readonly Group[] => {
  const map: Map<string, ReadonlyMap<string, ReadonlyMap<string, readonly GroupUrl[]>>> =
    new Map<string, ReadonlyMap<string, ReadonlyMap<string, readonly GroupUrl[]>>>();

  for (const {
    blockedURL,
    columnNumber,
    disposition,
    effectiveDirective,
    lineNumber,
    sourceFile,
  } of data) {
    const origin: string = mapBlockedUrlToOrigin(blockedURL);
    const dispositionMap: Map<string, ReadonlyMap<string, readonly GroupUrl[]>> =
      new Map(map.get(disposition));
    const effectiveDirectiveMap: Map<string, readonly GroupUrl[]> =
      new Map(dispositionMap.get(effectiveDirective));
    const groupUrls: readonly GroupUrl[] =
      effectiveDirectiveMap.get(origin) ?? EMPTY_ARRAY;

    const findGroupUrl = (groupUrl: GroupUrl): boolean =>
      groupUrl.blockedURL === blockedURL &&
      groupUrl.columnNumber === columnNumber &&
      groupUrl.lineNumber === lineNumber &&
      groupUrl.sourceFile === sourceFile;
    const groupUrl: GroupUrl | undefined = groupUrls.find(findGroupUrl);
    if (typeof groupUrl === 'undefined') {
      effectiveDirectiveMap.set(origin, [
        ...groupUrls,
        {
          blockedURL,
          columnNumber,
          count: 1,
          lineNumber,
          sourceFile,
        },
      ]);
    } else {
      effectiveDirectiveMap.set(origin, [
        ...groupUrls.filter(not(findGroupUrl)),
        {
          ...groupUrl,
          count: groupUrl.count + 1,
        },
      ]);
    }
    dispositionMap.set(effectiveDirective, effectiveDirectiveMap);
    map.set(disposition, dispositionMap);
  }

  return [...map.entries()].sort(sortEntriesByKey).flatMap(
    ([
      disposition,
      dispositionMap,
    ]: readonly [
      string,
      ReadonlyMap<string, ReadonlyMap<string, readonly GroupUrl[]>>
    ]): readonly Group[] =>
      [...dispositionMap.entries()].sort(sortEntriesByKey).flatMap(
        ([
          effectiveDirective,
          effectiveDirectiveMap,
        ]: readonly [
          string,
          ReadonlyMap<string, readonly GroupUrl[]>,
        ]): readonly Group[] =>
          [...effectiveDirectiveMap.entries()].sort(sortEntriesByKey).map(
            ([
              origin,
              urls,
            ]: readonly [
              string,
              readonly GroupUrl[],
            ]): Group => ({
              disposition,
              effectiveDirective,
              origin,
              urls,
            }),
          ),
      ),
  );
};

interface DispositionIconProps {
  readonly children: string;
}

function DispositionIcon({ children }: DispositionIconProps): ReactElement {
  switch (children) {
    case 'enforce':
      return <Emoji>❌</Emoji>;
    case 'report':
      return <Emoji>📄</Emoji>;
    default:
      return <Emoji>❔</Emoji>;
  }
}

interface SourceFileProps {
  readonly children: string;
  readonly columnNumber: number | null;
  readonly lineNumber: number | null;
}

const formatLineColumn = (
  lineNumber: number | null,
  columnNumber: number | null,
): string | null => {
  if (lineNumber === null) {
    return null;
  }

  if (columnNumber === null) {
    return `:${lineNumber.toString()}`;
  }

  return `:${lineNumber.toString()}:${columnNumber.toString()}`;
};

function SourceFile({
  children,
  columnNumber,
  lineNumber,
}: SourceFileProps): ReactElement {
  const href: string | null = mapUrlToHref(children);
  if (href === null) {
    return <code>{children}{formatLineColumn(lineNumber, columnNumber)}</code>;
  }

  return (
    <Link feature="content-security-policy" href={href} title="">
      {children}{formatLineColumn(lineNumber, columnNumber)}
    </Link>
  );
}

function ListItem({
  disposition,
  effectiveDirective,
  origin,
  urls,
}: Group): ReactElement {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={expanded ? EXPANDED_CLASS_NAME : COLLAPSED_CLASS_NAME}>
      <span
        className={EXPANDO_CLASS_NAME}
        onClick={(): void => {
          setExpanded(toggle);
        }}
      >
        <DispositionIcon>{disposition}</DispositionIcon>{' '}
        {effectiveDirective}{' '}
        {origin}{' '}
        ({urls.length})
      </span>
      <ul>
        {urls.map(({
          blockedURL,
          columnNumber,
          count,
          lineNumber,
          sourceFile,
        }: GroupUrl): ReactElement => {
          const href: string | null = mapUrlToHref(blockedURL);
          return (
            <li key={`${blockedURL} ${sourceFile} ${lineNumber} ${columnNumber}`}>
              {
                href === null ?
                  blockedURL :
                  <Link
                    feature="content-security-policy"
                    href={href}
                    title=""
                  >
                    {blockedURL}
                  </Link>
              }
              {
                sourceFile === null ?
                  null :
                  <>
                    {' '}in{' '}
                    <SourceFile
                      columnNumber={columnNumber}
                      lineNumber={lineNumber}
                    >
                      {sourceFile}
                    </SourceFile>
                  </>
              }
              {' '}({count})
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default function ContentSecurityPolicy(): ReactElement {
  const {
    data,
    error,
    initiated,
    loading,
    request,
  } = useAsyncState<CspResponse>();

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

  const groups: readonly Group[] = mapDataToGroups(data);
  return (
    <Section header="Content Security Policy">
      <ul className={LIST_CLASS_NAME}>
        {groups.map(({
          disposition,
          effectiveDirective,
          origin,
          urls,
        }: Group): ReactElement =>
          <ListItem
            disposition={disposition}
            effectiveDirective={effectiveDirective}
            key={`${disposition} ${effectiveDirective} ${origin}`}
            origin={origin}
            urls={urls}
          />
        )}
      </ul>
    </Section>
  );
}
