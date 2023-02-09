export default `
{
  cost
  viewer {
    accounts(
      filter: {
        accountTag: $accountTag
      }
    ) {
      workersAnalyticsEngineAdaptiveGroups(
        filter: {
          datetime_gt: $datetime_gt
        }
        limit: 1
        orderBy: [
          count_ASC
        ]
      ) {
        count
      }
    }
    budget
  }
}
`;
