export default `
{
  cost
  viewer {
    accounts(
      filter: {
        accountTag: $accountTag
      }
    ) {
      rumPerformanceEventsAdaptiveGroups(
        filter: {
          datetime_gt: $datetime_gt
        }
        limit: 1
        orderBy: [
          avg_connectionTime_ASC
        ]
      ) {
        avg {
          connectionTime
          dnsTime
          firstContentfulPaint
          firstPaint
          loadEventTime
          pageLoadTime
          pageRenderTime
          requestTime
          responseTime
          sampleInterval
        }
        count
        sum {
          visits
        }
      }
    }
    budget
  }
}
`;
