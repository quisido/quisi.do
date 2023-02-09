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
        avg {
          sampleInterval
        }
        max {
          cpuTime
          duration
          responseBodySize
          wallTime
        }
        min {
          cpuTime
          duration
          responseBodySize
          wallTime
        }
        sum {
          duration
          errors
          requests
          responseBodySize
          subrequests
          wallTime
        }
      }
    }
    budget
  }
}
`;
