export default function sortArticlesByViews(stats) {
  return (
    { title: title1 },
    { title: title2 },
  ) => {

    // No stats
    if (!Object.prototype.hasOwnProperty.call(stats, title1)) {
      if (!Object.prototype.hasOwnProperty.call(stats, title2)) {
        if (title1 > title2) {
          return 1;
        }
        if (title1 < title2) {
          return -1;
        }
        return 0;
      }
      return 1;
    }
    if (!Object.prototype.hasOwnProperty.call(stats, title2)) {
      return -1;
    }

    // Views
    if (stats[title1].views < stats[title2].views) {
      return 1;
    }
    if (stats[title1].views > stats[title2].views) {
      return -1;
    }

    // Reads
    if (stats[title1].reads < stats[title2].reads) {
      return 1;
    }
    if (stats[title1].reads > stats[title2].reads) {
      return -1;
    }

    // Likes
    const likes1 =
      (stats[title1].claps || 0) +
      (stats[title1].comments_count || 0) +
      (stats[title1].positive_reactions_count || 0);
    const likes2 =
      (stats[title2].claps || 0) +
      (stats[title2].comments_count || 0) +
      (stats[title2].positive_reactions_count || 0);
    if (likes1 < likes2) {
      return 1;
    }
    if (likes1 > likes2) {
      return -1;
    }

    // Title
    if (title1 > title2) {
      return 1;
    }
    if (title1 < title2) {
      return -1;
    }

    return 1;
  }
};
