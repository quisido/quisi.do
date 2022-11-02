import mapCssStyleSheetsToAwsuiGlobalStyleSheetElement from '../utils/map-css-style-sheets-to-awsui-global-style-sheet-element';
import mapStyleSheetListToCssStyleSheets from '../utils/map-stylesheet-list-to-css-stylesheets';

// TODO: Include the stylesheet for CSS variables/keyframes.

export default function mapStyleSheetListToAwsuiGlobalStyleElement(
  list: Readonly<StyleSheetList>,
): Element | ProcessingInstruction {
  const sheets: Set<CSSStyleSheet> = mapStyleSheetListToCssStyleSheets(list);
  return mapCssStyleSheetsToAwsuiGlobalStyleSheetElement(sheets);
}
