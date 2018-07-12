export default function mapAppIdToScriptElement(
  appId: string,
): HTMLScriptElement {
  const script: HTMLScriptElement = document.createElement('script');
  script.setAttribute('async', 'true');
  script.setAttribute('src', `https://widget.intercom.io/widget/${appId}`);
  script.setAttribute('type', 'text/javascript');
  return script;
}
