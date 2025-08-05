import mapDocumentToFontSize from './map-document-to-font-size.js';

export default function mapWindowToFontSize({ document }: Window): number {
  return mapDocumentToFontSize(document);
}
