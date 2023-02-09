export default `
{
  cost
  viewer {
    accounts(
      filter: {
        accountTag: $accountTag
      }
    ) {
      rumWebVitalsEventsAdaptiveGroups(
        filter: {
          datetime_gt: $datetime_gt
        }
        limit: 1
        orderBy: [
          avg_cumulativeLayoutShift_ASC
        ]
      ) {
        avg {
          cumulativeLayoutShift
          firstContentfulPaint
          firstInputDelay
          interactionToNextPaint
          largestContentfulPaint
          sampleInterval
          timeToFirstByte
        }
        count
        dimensions {
          countryName
          cumulativeLayoutShiftElement
          cumulativeLayoutShiftPath
          customTagInternalSxg
          date
          datetimeFifteenMinutes
          datetimeFiveMinutes
          datetimeHalfOfHour
          datetimeHour
          datetimeMinute
          deviceType
          firstInputDelayElement
          firstInputDelayName
          firstInputDelayPath
          largestContentfulPaintElement
          largestContentfulPaintObjectHost
          largestContentfulPaintObjectPath
          largestContentfulPaintObjectScheme
          largestContentfulPaintPath
          refererHost
          refererPath
          refererScheme
          requestHost
          requestPath
          requestScheme
          siteTag
          userAgentBrowser
          userAgentOS
        }
        quantiles {
          cumulativeLayoutShiftP50
          cumulativeLayoutShiftP75
          cumulativeLayoutShiftP90
          cumulativeLayoutShiftP99
          firstContentfulPaintP50
          firstContentfulPaintP75
          firstContentfulPaintP90
          firstContentfulPaintP99
          firstInputDelayP50
          firstInputDelayP75
          firstInputDelayP90
          firstInputDelayP99
          interactionToNextPaintP50
          interactionToNextPaintP75
          interactionToNextPaintP90
          interactionToNextPaintP99
          largestContentfulPaintP50
          largestContentfulPaintP75
          largestContentfulPaintP90
          largestContentfulPaintP99
          timeToFirstByteP50
          timeToFirstByteP75
          timeToFirstByteP90
          timeToFirstByteP99
        }
        sum {
          clsGood
          clsNeedsImprovement
          clsPoor
          clsTotal
          fcpGood
          fcpNeedsImprovement
          fcpPoor
          fcpTotal
          fidGood
          fidNeedsImprovement
          fidPoor
          fidTotal
          inpGood
          inpNeedsImprovement
          inpPoor
          inpTotal
          lcpGood
          lcpNeedsImprovement
          lcpPoor
          lcpTotal
          ttfbGood
          ttfbNeedsImprovement
          ttfbPoor
          ttfbTotal
          visits
        }
      }
    }
    budget
  }
}
`;
