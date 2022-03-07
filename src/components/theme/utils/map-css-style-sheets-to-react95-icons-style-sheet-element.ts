import MISSING_REACT95_ICONS_STYLE_SHEET_ERROR from '../constants/missing-react95-icons-style-sheet-error';
import mapCssRulesToReact95IconsStyleSheetElement from '../utils/map-css-rules-to-react95-icons-style-sheet-element';
import mapCssStyleSheetToCssRules from '../utils/map-css-style-sheet-to-css-rules';

export default function mapCssStyleSheetsToReact95IconsStyleSheetElement(
  sheets: Readonly<Set<CSSStyleSheet>>,
): Element | ProcessingInstruction {
  for (const sheet of sheets) {
    const rules: Set<CSSRule> = mapCssStyleSheetToCssRules(sheet);
    const node: Element | ProcessingInstruction | null =
      mapCssRulesToReact95IconsStyleSheetElement(rules);
    if (node !== null) {
      return node;
    }
  }

  throw MISSING_REACT95_ICONS_STYLE_SHEET_ERROR;
}
