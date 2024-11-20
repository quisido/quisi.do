export default function mapRequestInfoToString(info: RequestInfo): string {
  if (typeof info === 'string') {
    return info;
  }

  if ('url' in info) {
    return info.url;
  }

  return info.toString();
}
