import type Worker from '@quisido/worker';
import { isAnalyticsEngineResponse, StatusCode } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import reduceAnalyticsEngineRowsToResponse from './reduce-analytics-engine-rows-to-response.js';

export default function handleAnalyticsEngineResponse(
  this: Worker,
  json: unknown,
): Response {
  if (!isAnalyticsEngineResponse(json)) {
    this.emitPrivateMetric({
      name: MetricName.InvalidAnalyticsResponse,
      value: JSON.stringify(json),
    });

    return new Response('Invalid Analytics Engine response ☹️', {
      status: StatusCode.BadGateway,
    });
  }

  const spacing = 2;
  return new Response(
    JSON.stringify(
      json.data.reduce(reduceAnalyticsEngineRowsToResponse.bind(this), {}),
      null,
      spacing,
    ),
  );
}
