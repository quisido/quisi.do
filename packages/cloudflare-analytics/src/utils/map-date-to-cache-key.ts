export default function mapDateToCacheKey(date: Readonly<Date>): string {
  const day: number = date.getUTCDate();
  const month: number = date.getUTCMonth();
  const year: number = date.getUTCFullYear();
  return `https://analytics.cloudflare.cscdn.net/cache/date/${year}-${month}-${day}/`;
}
