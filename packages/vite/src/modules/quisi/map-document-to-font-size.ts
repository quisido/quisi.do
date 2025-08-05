import mapHtmlElementToFontSize from './map-html-element-to-font-size.js';

export default function mapDocumentToFontSize({
  documentElement,
}: Document): number {
  return mapHtmlElementToFontSize(documentElement);
}
