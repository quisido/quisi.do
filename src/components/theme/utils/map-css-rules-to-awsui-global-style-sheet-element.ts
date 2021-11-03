import MISSING_AWSUI_GLOBAL_CSS_RULES_PARENT_STYLESHEET_ERROR from '../constants/missing-awsui-global-css-rules-parent-stylesheet-error';
import MISSING_AWSUI_GLOBAL_STYLESHEET_OWNER_NODE_ERROR from '../constants/missing-awsui-global-stylesheet-owner-node-error';
import filterCssRuleByAwsuiCssFontFaceRule from '../utils/filter-css-rule-by-awsui-css-font-face-rule';

export default function mapCssRulesToAwsuiGlobalStyleSheetElement(
  rules: Set<CSSRule>,
): Element | ProcessingInstruction | null {
  for (const rule of rules) {
    if (!filterCssRuleByAwsuiCssFontFaceRule(rule)) {
      continue;
    }

    const sheet: CSSStyleSheet | null = rule.parentStyleSheet;
    if (sheet === null) {
      throw MISSING_AWSUI_GLOBAL_CSS_RULES_PARENT_STYLESHEET_ERROR;
    }

    const node: Element | ProcessingInstruction | null = sheet.ownerNode;
    if (node === null) {
      throw MISSING_AWSUI_GLOBAL_STYLESHEET_OWNER_NODE_ERROR;
    }
    return node;
  }

  return null;
}
