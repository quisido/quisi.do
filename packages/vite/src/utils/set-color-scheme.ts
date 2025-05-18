const FIRST = 0;

const getHtml = (): HTMLHtmlElement => {
  const html: HTMLHtmlElement | null = window.document
    .getElementsByTagName('html')
    .item(FIRST);
  if (html === null) {
    throw new Error('Expected an HTML element.');
  }
  return html;
};

const HTML: HTMLHtmlElement = getHtml();

export default function setColorScheme(scheme: string | null): void {
  if (scheme === null) {
    delete HTML.dataset['colorScheme'];
  } else {
    HTML.dataset['colorScheme'] = scheme;
  }
}
