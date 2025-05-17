export default function mapTrackingIdToScriptSrc(trackingId: string): string {
  return `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
}
