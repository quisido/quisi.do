import mapTrackingIdToScriptSrc from '../utils/map-tracking-id-to-script-src.js';

export default function mapTrackingIdToScriptElement(
  trackingId: string,
): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('src', mapTrackingIdToScriptSrc(trackingId));
  script.setAttribute('type', 'text/javascript');
  return script;
}
