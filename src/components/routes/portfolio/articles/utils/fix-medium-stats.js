import mergeStats from './merge-stats';
import titleFixes from './title-fixes';

export default function fixMediumStats(oldStats, newStats) {
  const fixedStats = {...oldStats};

  for (const [ title, article ] of Object.entries(newStats)) {
    const fixedTitle = Object.prototype.hasOwnProperty.call(titleFixes, title)
      ? titleFixes[title]
      : title;
    fixedStats[fixedTitle] = mergeStats(fixedStats[fixedTitle], article);
  }

  return fixedStats;
}
