import mapCssRulesToCloudscapeGlobalStyleSheetElement from '../utils/map-css-rules-to-cloudscape-global-style-sheet-element';
import mapCssStyleSheetToCssRules from '../utils/map-css-style-sheet-to-css-rules';

export default function mapCssStyleSheetsToCloudscapeGlobalStyleSheetElement(
  sheets: Readonly<Set<CSSStyleSheet>>,
): Element | ProcessingInstruction {
  for (const sheet of sheets) {
    const rules: Set<CSSRule> = mapCssStyleSheetToCssRules(sheet);
    const node: Element | ProcessingInstruction | null =
      mapCssRulesToCloudscapeGlobalStyleSheetElement(rules);
    if (node !== null) {
      return node;
    }
  }

  throw new Error('Expected the Cloudscape global style sheet to exist.');
}
