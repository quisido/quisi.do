/**
 *   Meticulous loads synchronously on purpose. This is acceptable, because this
 * component should only be mounted in development environments.
 * https://app.meticulous.ai/projects/quisi.do/quisi.do/setup/recorder/nextjs/install-in-app-directory
 */

export default function appendMeticulous(
  recordingToken: string,
  isProductionEnvironment: boolean,
  nonce: string,
): void {
  const script: HTMLScriptElement = window.document.createElement('script');
  script.dataset['isProductionEnvironment'] =
    isProductionEnvironment.toString();
  script.dataset['recordingToken'] = recordingToken;
  script.setAttribute('nonce', nonce);
  script.setAttribute('src', 'https://snippet.meticulous.ai/v1/meticulous.js');
  script.setAttribute('type', 'text/javascript');
  window.document.head.appendChild(script);
}
