import mapCssRulesToAwsuiGlobalStyleSheetElement from '../utils/map-css-rules-to-awsui-global-style-sheet-element';
import mapCssStyleSheetToCssRules from '../utils/map-css-style-sheet-to-css-rules';

export default function mapCssStyleSheetsToAwsuiGlobalStyleSheetElement(
  sheets: Readonly<Set<CSSStyleSheet>>,
): Element | ProcessingInstruction {
  for (const sheet of sheets) {
    const rules: Set<CSSRule> = mapCssStyleSheetToCssRules(sheet);
    const node: Element | ProcessingInstruction | null =
      mapCssRulesToAwsuiGlobalStyleSheetElement(rules);
    if (node !== null) {
      return node;
    }
  }

  throw new Error('Expected the AWS UI global style sheet to exist.');
}
