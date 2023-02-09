export default `
{
  cost
  viewer {
    accounts(
      filter: {
        accountTag: $accountTag
      }
    ) {
      rumPageloadEventsAdaptiveGroups(
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
