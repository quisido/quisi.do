export default function mapDevArticlesCountToHeader(count: number): string {
  if (count === 1) {
    return 'Dev.to article';
  }
  return 'Dev.to articles';
}
