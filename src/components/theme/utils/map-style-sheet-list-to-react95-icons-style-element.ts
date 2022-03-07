import mapCssStyleSheetsToReact95IconsStyleSheetElement from '../utils/map-css-style-sheets-to-react95-icons-style-sheet-element';
import mapStyleSheetListToCssStyleSheets from '../utils/map-stylesheet-list-to-css-stylesheets';

export default function mapStyleSheetListToReact95IconsStyleSheetElement(
  list: Readonly<StyleSheetList>,
): Element | ProcessingInstruction {
  const sheets: Set<CSSStyleSheet> = mapStyleSheetListToCssStyleSheets(list);
  return mapCssStyleSheetsToReact95IconsStyleSheetElement(sheets);
}
