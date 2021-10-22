import '@awsui/global-styles/index.css';
import MISSING_AWSUI_GLOBAL_STYLE_SHEET_ERROR from '../constants/missing-awsui-global-style-sheet-error';
import MISSING_AWSUI_OWNER_NODE_ERROR from '../constants/missing-awsui-owner-node-error';
import filterCssRuleByAwsuiCssFontFaceRule from '../utils/filter-css-rule-by-awsui-css-font-face-rule';
import mapCssStyleSheetToCssStyleRules from '../utils/map-css-style-sheet-to-css-style-rules';
import mapStyleSheetListToCssStyleSheets from '../utils/map-stylesheet-list-to-css-stylesheets';

export default function getAwsuiGlobalStyleElement():
  | Element
  | ProcessingInstruction {
  const sheets: Set<CSSStyleSheet> = mapStyleSheetListToCssStyleSheets(
    document.styleSheets,
  );

  for (const sheet of sheets) {
    const rules: Set<CSSRule> = mapCssStyleSheetToCssStyleRules(sheet);
    for (const rule of rules) {
      if (!filterCssRuleByAwsuiCssFontFaceRule(rule)) {
        continue;
      }

      const node: Element | ProcessingInstruction | null = sheet.ownerNode;
      if (node === null) {
        throw MISSING_AWSUI_OWNER_NODE_ERROR;
      }
      return node;
    }
  }

  throw MISSING_AWSUI_GLOBAL_STYLE_SHEET_ERROR;
}
