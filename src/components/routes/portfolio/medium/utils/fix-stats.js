const titleFixes = {
  'Building ReactN — An extension of React that includes global state management':
    'No-Boilerplate Global State Management in React',
  'Caching React Event Listeners to Improve Performance':
    'Cache your React event listeners to improve performance.',
  'Solving an Ambiguous JS Interview Question on Curried Functions':
    'Variable Length Currying in JavaScript',
}

export default function fixStats(stats) {
  const fixedStats = {...stats};

  // For each article,
  for (const [ title, article ] of Object.entries(stats)) {

    // If this title is wrong,
    if (Object.prototype.hasOwnProperty.call(titleFixes, title)) {
      const fixedTitle = titleFixes[title];

      // For each stat belonging to this title,
      for (const [ stat, value ] of Object.entries(article)) {

        // Merge it with the correct title's stats, if it's a number.
        if (
          typeof value === 'number' &&
          stat !== 'readingTime'
        ) {
          fixedStats[fixedTitle][stat] += value;
        }
      }
      delete fixedStats[title];
    }
  }
  return fixedStats;
}
