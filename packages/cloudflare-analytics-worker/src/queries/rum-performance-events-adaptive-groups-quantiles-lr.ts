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
        quantiles {
          loadEventTimeP50
          loadEventTimeP75
          loadEventTimeP90
          loadEventTimeP99
          pageLoadTimeP50
          pageLoadTimeP75
          pageLoadTimeP90
          pageLoadTimeP99
          pageRenderTimeP50
          pageRenderTimeP75
          pageRenderTimeP90
          pageRenderTimeP99
          requestTimeP50
          requestTimeP75
          requestTimeP90
          requestTimeP99
          responseTimeP50
          responseTimeP75
          responseTimeP90
          responseTimeP99
        }
      }
    }
    budget
  }
}
`;
