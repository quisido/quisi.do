import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import {
  isAnalyticsEngineRow,
  type AnalyticsEngineRow,
} from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIOptionsResponse from '../../routes/whoami/whoami-options-response.js';
import FatalError from '../../utils/fatal-error.js';

interface AnalyticsEngineData {
  readonly data: readonly AnalyticsEngineRow[];
}

const isAnalyticsEngineData = (value: unknown): value is AnalyticsEngineData =>
  typeof value === 'object' &&
  value !== null &&
  'data' in value &&
  Array.isArray(value.data) &&
  value.data.every(isAnalyticsEngineRow);

const ANALYTICS_BODY = `
SELECT *
FROM AUTHN_PUBLIC
ORDER BY timestamp DESC;
`;

export default async function handleAnalyticsFetchRequest(
  this: Worker,
): Promise<Response> {
  // Options
  const method: string = this.getRequestMethod();
  if (method === 'OPTIONS') {
    return new WhoAmIOptionsResponse(this);
  }

  const id: unknown = this.getEnv('ANALYTICS_ID');
  if (typeof id !== 'string') {
    if (typeof id === 'undefined') {
      throw new FatalError(ErrorCode.MissingAnalyticsId);
    }

    this.emitPrivateMetric({
      name: MetricName.InvalidAnalyticsId,
      value: JSON.stringify(id),
    });

    this.emitPublicMetric({
      name: MetricName.InvalidAnalyticsId,
      type: typeof id,
    });

    throw new FatalError(ErrorCode.InvalidAnalyticsId);
  }

  const secret: unknown = this.getEnv('ANALYTICS_SECRET');
  if (typeof secret !== 'string') {
    if (typeof secret === 'undefined') {
      throw new FatalError(ErrorCode.MissingAnalyticsSecret);
    }

    this.emitPrivateMetric({
      name: MetricName.InvalidAnalyticsSecret,
      value: JSON.stringify(secret),
    });

    this.emitPublicMetric({
      name: MetricName.InvalidAnalyticsSecret,
      type: typeof secret,
    });

    throw new FatalError(ErrorCode.InvalidAnalyticsSecret);
  }

  return await this.snapshot(
    fetch(
      `https://api.cloudflare.com/client/v4/accounts/${id}/analytics_engine/sql`,
      {
        body: ANALYTICS_BODY,
        method: 'POST',

        headers: new Headers({
          Authorization: `Bearer ${secret}`,
        }),
      },
    ),

    async (response: Response): Promise<Response> => {
      return await this.snapshot(response.json(), (json: unknown): Response => {
        if (!isAnalyticsEngineData(json)) {
          this.emitPrivateMetric({
            name: MetricName.InvalidAnalyticsData,
            value: JSON.stringify(json),
          });

          throw new FatalError(ErrorCode.InvalidAnalyticsData);
        }

        const data = json.data.reduce<
          Record<string, { n: number[]; s: string[]; i: number; t: number }[]>
        >(
          (
            newData: Record<
              string,
              { n: number[]; s: string[]; i: number; t: number }[]
            >,
            datum: AnalyticsEngineRow,
          ) => ({
            ...newData,
            [datum.index1]: [
              ...(newData[datum.index1] ?? []),
              {
                ...(
                  new Array(20).fill(null).map((_, i) => i + 1) as OneToTwenty[]
                ).reduce<{ n: number[]; s: string[] }>(
                  (
                    { n, s }: { n: number[]; s: string[] },
                    idx: OneToTwenty,
                  ): { n: number[]; s: string[] } => ({
                    n:
                      datum[`double${idx}`] === 0
                        ? n
                        : [...n, datum[`double${idx}`]],
                    s:
                      datum[`blob${idx}`] === ''
                        ? s
                        : [...s, datum[`blob${idx}`]],
                  }),
                  {
                    n: [],
                    s: [],
                  },
                ),
                i: datum._sample_interval,
                t: new Date(datum.timestamp).getTime(),
              },
            ],
          }),
          {},
        );

        return new Response(JSON.stringify(data, null, 2));
      });
    },
  );
}
