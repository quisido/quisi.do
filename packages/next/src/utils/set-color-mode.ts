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

export default function setColorMode(mode: string | null): void {
  if (mode === null) {
    delete HTML.dataset['colorMode'];
  } else {
    HTML.dataset['colorMode'] = mode;
  }
}
