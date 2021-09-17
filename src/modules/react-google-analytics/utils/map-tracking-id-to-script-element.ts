export default function mapTrackingIdToScriptElement(
  trackingId: string,
): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute(
    'src',
    `https://www.googletagmanager.com/gtag/js?id=${trackingId}`,
  );
  return script;
}
