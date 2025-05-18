type OptionalMetrics = Record<
  | 'cpuTime_min'
  | 'cpuTimeP25'
  | 'cpuTimeP50'
  | 'duration_min'
  | 'duration_sum'
  | 'durationP25'
  | 'durationP50'
  | 'responseBodySize_min'
  | 'responseBodySize_sum'
  | 'responseBodySizeP25'
  | 'responseBodySizeP50'
  | 'wallTime_min'
  | 'wallTime_sum'
  | 'wallTimeP25'
  | 'wallTimeP50',
  number | undefined
>;

type RequiredMetrics = Record<
  | 'cpuTime_max'
  | 'cpuTimeP75'
  | 'cpuTimeP90'
  | 'cpuTimeP99'
  | 'cpuTimeP999'
  | 'duration_max'
  | 'durationP75'
  | 'durationP90'
  | 'durationP99'
  | 'durationP999'
  | 'errors_sum'
  | 'requests_sum'
  | 'responseBodySize_max'
  | 'responseBodySizeP75'
  | 'responseBodySizeP90'
  | 'responseBodySizeP99'
  | 'responseBodySizeP999'
  | 'sampleInterval_avg'
  | 'subrequests_sum'
  | 'wallTime_max'
  | 'wallTimeP75'
  | 'wallTimeP90'
  | 'wallTimeP99'
  | 'wallTimeP999',
  number
>;

export type CloudflareWorkersInvocations = OptionalMetrics & RequiredMetrics;
