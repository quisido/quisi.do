export default function mergeStats(oldArticle, newArticle) {

  // If this article is not yet created,
  if (!oldArticle) {
    return newArticle;
  }

  // If this article is already created,
  const fixedArticle = {...oldArticle};

  // For each stat belonging to this article,
  for (const [ stat, value ] of Object.entries(newArticle)) {

    // Merge it with the correct title's stats, if it's a number.
    if (
      typeof value === 'number' &&
      stat !== 'readingTime'
    ) {
      fixedArticle[stat] += value;
    }
  }

  return fixedArticle;
}
