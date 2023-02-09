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
          connectionTimeP50
          connectionTimeP75
          connectionTimeP90
          connectionTimeP99
          dnsTimeP50
          dnsTimeP75
          dnsTimeP90
          dnsTimeP99
          firstContentfulPaintP50
          firstContentfulPaintP75
          firstContentfulPaintP90
          firstContentfulPaintP99
          firstPaintP50
          firstPaintP75
          firstPaintP90
          firstPaintP99
        }
      }
    }
    budget
  }
}
`;
