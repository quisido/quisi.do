import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import mapRecordToSum from '../../utils/map-record-to-sum';

interface Props {
  readonly sessionCountTimeSeries: Record<string, number>;
}

interface State {
  readonly dailySessionCount: number;
  readonly githubWorkflowStatusAlt: string | undefined;
}

const DAYS_PER_WEEK = 7;

export default function useDashboardContent({
  sessionCountTimeSeries,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    githubWorkflowStatusAlt: translate('GitHub workflow status'),

    dailySessionCount: useMemo(
      (): number =>
        Math.ceil(mapRecordToSum(sessionCountTimeSeries) / DAYS_PER_WEEK),
      [sessionCountTimeSeries],
    ),
  };
}
