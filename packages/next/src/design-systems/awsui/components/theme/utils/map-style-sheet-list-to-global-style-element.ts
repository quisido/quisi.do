import mapStyleSheetListToCssStyleSheets from '../../../../../utils/map-stylesheet-list-to-css-stylesheets';
import mapCssStyleSheetsToGlobalStyleSheetElement from './map-css-style-sheets-to-global-style-sheet-element';

// TODO: Include the stylesheet for CSS variables/keyframes.

export default function mapStyleSheetListToAwsuiGlobalStyleElement(
  list: Readonly<StyleSheetList>,
): Element | ProcessingInstruction {
  const sheets: Set<CSSStyleSheet> = mapStyleSheetListToCssStyleSheets(list);
  return mapCssStyleSheetsToGlobalStyleSheetElement(sheets);
}
