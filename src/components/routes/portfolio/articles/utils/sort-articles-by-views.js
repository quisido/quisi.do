export default function sortArticlesByViews(stats) {
  return (
    { title: title1 },
    { title: title2 },
  ) => {

    // No stats
    if (!Object.prototype.hasOwnProperty.call(stats, title1)) {
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

    // Claps
    if (stats[title1].claps < stats[title2].claps) {
      return 1;
    }
    if (stats[title1].claps > stats[title2].claps) {
      return -1;
    }

    return 1;
  }
};
