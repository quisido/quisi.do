import MISSING_AWSUI_GLOBAL_STYLE_SHEET_ERROR from '../constants/missing-awsui-global-style-sheet-error';
import mapCssRulesToAwsuiGlobalStyleSheetElement from '../utils/map-css-rules-to-awsui-global-style-sheet-element';
import mapCssStyleSheetToCssRules from '../utils/map-css-style-sheet-to-css-rules';

export default function mapCssStyleSheetsToAwsuiGlobalStyleSheetElement(
  sheets: Set<CSSStyleSheet>,
): Element | ProcessingInstruction {
  for (const sheet of sheets) {
    const rules: Set<CSSRule> = mapCssStyleSheetToCssRules(sheet);
    const node: Element | ProcessingInstruction | null =
      mapCssRulesToAwsuiGlobalStyleSheetElement(rules);
    if (node !== null) {
      return node;
    }
  }

  throw MISSING_AWSUI_GLOBAL_STYLE_SHEET_ERROR;
}
