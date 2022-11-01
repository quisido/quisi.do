import MISSING_CLOUDSCAPE_GLOBAL_CSS_RULES_PARENT_STYLESHEET_ERROR from '../constants/missing-cloudscape-global-css-rules-parent-stylesheet-error';
import MISSING_CLOUDSCAPE_GLOBAL_STYLESHEET_OWNER_NODE_ERROR from '../constants/missing-cloudscape-global-stylesheet-owner-node-error';
import filterCssRuleByCloudscapeCssFontFaceRule from '../utils/filter-css-rule-by-cloudscape-css-font-face-rule';

export default function mapCssRulesToCloudscapeGlobalStyleSheetElement(
  rules: Readonly<Set<CSSRule>>,
): Element | ProcessingInstruction | null {
  for (const rule of rules) {
    if (!filterCssRuleByCloudscapeCssFontFaceRule(rule)) {
      continue;
    }

    const sheet: CSSStyleSheet | null = rule.parentStyleSheet;
    if (sheet === null) {
      throw MISSING_CLOUDSCAPE_GLOBAL_CSS_RULES_PARENT_STYLESHEET_ERROR;
    }

    const node: Element | ProcessingInstruction | null = sheet.ownerNode;
    if (node === null) {
      throw MISSING_CLOUDSCAPE_GLOBAL_STYLESHEET_OWNER_NODE_ERROR;
    }
    return node;
  }

  return null;
}
