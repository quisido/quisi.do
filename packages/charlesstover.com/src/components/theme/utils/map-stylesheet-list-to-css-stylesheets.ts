export default function mapStyleSheetListToCssStyleSheets(
  list: Readonly<StyleSheetList>,
): Set<CSSStyleSheet> {
  // In Firefox, `document.styleSheets` is a `Proxy<StyleSheetList>`, which
  //   throws a `TypeError` when the `item` method is called. Instead, we must
  //   treat `Proxy<StyleSheetList>` as an array.
  // TypeError: 'item' called on an object that does not implement interface
  //   StyleSheetList.
  const getItem = (index: number): CSSStyleSheet | null | undefined => {
    try {
      return list.item(index);
    } catch (_err: unknown) {
      return list[index];
    }
  };

  const sheets: Set<CSSStyleSheet> = new Set();

  const sheetCount: number = list.length;
  for (let i = 0; i < sheetCount; i++) {
    const sheet: CSSStyleSheet | null | undefined = getItem(i);
    if (sheet === null || typeof sheet === 'undefined') {
      break;
    }
    sheets.add(sheet);
  }

  return sheets;
}
