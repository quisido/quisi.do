const SINGLE = 1;

export default function mapDevArticlesCountToHeader(count: number): string {
  if (count === SINGLE) {
    return 'Dev.to article';
  }
  return 'Dev.to articles';
}
