type CloudflareRumPerformanceEvents = Record<
  | 'connectionTime_avg'
  | 'connectionTimeP50'
  | 'connectionTimeP75'
  | 'connectionTimeP90'
  | 'connectionTimeP99'
  | 'count'
  | 'dnsTime_avg'
  | 'dnsTimeP50'
  | 'dnsTimeP75'
  | 'dnsTimeP90'
  | 'dnsTimeP99'
  | 'firstContentfulPaint_avg'
  | 'firstContentfulPaintP50'
  | 'firstContentfulPaintP75'
  | 'firstContentfulPaintP90'
  | 'firstContentfulPaintP99'
  | 'firstPaint_avg'
  | 'firstPaintP50'
  | 'firstPaintP75'
  | 'firstPaintP90'
  | 'firstPaintP99'
  | 'loadEventTime_avg'
  | 'loadEventTimeP50'
  | 'loadEventTimeP75'
  | 'loadEventTimeP90'
  | 'loadEventTimeP99'
  | 'pageLoadTime_avg'
  | 'pageLoadTimeP50'
  | 'pageLoadTimeP75'
  | 'pageLoadTimeP90'
  | 'pageLoadTimeP99'
  | 'pageRenderTime_avg'
  | 'pageRenderTimeP50'
  | 'pageRenderTimeP75'
  | 'pageRenderTimeP90'
  | 'pageRenderTimeP99'
  | 'requestTime_avg'
  | 'requestTimeP50'
  | 'requestTimeP75'
  | 'requestTimeP90'
  | 'requestTimeP99'
  | 'responseTime_avg'
  | 'responseTimeP50'
  | 'responseTimeP75'
  | 'responseTimeP90'
  | 'responseTimeP99'
  | 'sampleInterval_avg'
  | 'visits_sum',
  number | undefined
>;

export default CloudflareRumPerformanceEvents;
