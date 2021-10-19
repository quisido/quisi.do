export default function mapStyleSheetListToCssStyleSheets(
  list: Readonly<StyleSheetList>,
): Set<CSSStyleSheet> {
  const sheets: Set<CSSStyleSheet> = new Set();

  const sheetCount: number = list.length;
  for (let i = 0; i < sheetCount; i++) {
    const sheet: CSSStyleSheet | null = list.item(i);
    if (sheet === null) {
      break;
    }
    sheets.add(sheet);
  }

  return sheets;
}
