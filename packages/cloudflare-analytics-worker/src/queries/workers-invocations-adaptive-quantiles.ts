export default `
{
  cost
  viewer {
    accounts(
      filter: {
        accountTag: $accountTag
      }
    ) {
      workersInvocationsAdaptive(
        filter: {
          datetime_gt: $datetime_gt
        }
        limit: 1
        orderBy: [
          avg_sampleInterval_ASC
        ]
      ) {
        quantiles {
          cpuTimeP25
          cpuTimeP50
          cpuTimeP75
          cpuTimeP90
          cpuTimeP99
          cpuTimeP999
          durationP25
          durationP50
          durationP75
          durationP90
          durationP99
          durationP999
          responseBodySizeP25
          responseBodySizeP50
          responseBodySizeP75
          responseBodySizeP90
          responseBodySizeP99
          responseBodySizeP999
          wallTimeP25
          wallTimeP50
          wallTimeP75
          wallTimeP90
          wallTimeP99
          wallTimeP999
        }
      }
    }
    budget
  }
}
`;
