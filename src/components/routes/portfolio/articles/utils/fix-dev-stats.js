import mergeStats from './merge-stats';
import titleFixes from './title-fixes';

export default function fixDevStats(oldStats, newStats) {
  const fixedStats = {...oldStats};

  for (const article of newStats) {
    const title = Object.prototype.hasOwnProperty.call(titleFixes, article.title)
      ? titleFixes[article.title]
      : article.title;
    fixedStats[title] = mergeStats(fixedStats[title], article);
  }

  return fixedStats;
}
