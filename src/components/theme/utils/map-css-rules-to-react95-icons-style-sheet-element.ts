import MISSING_REACT95_ICONS_CSS_RULES_PARENT_STYLESHEET_ERROR from '../constants/missing-react95-icons-css-rules-parent-stylesheet-error';
import MISSING_REACT95_ICONS_STYLESHEET_OWNER_NODE_ERROR from '../constants/missing-react95-icons-stylesheet-owner-node-error';
import filterCssRuleByReact95 from '../utils/filter-css-rule-by-react95';

export default function mapCssRulesToReact95IconsStyleSheetElement(
  rules: Readonly<Set<CSSRule>>,
): Element | ProcessingInstruction | null {
  for (const rule of rules) {
    if (!filterCssRuleByReact95(rule)) {
      continue;
    }

    const sheet: CSSStyleSheet | null = rule.parentStyleSheet;
    if (sheet === null) {
      throw MISSING_REACT95_ICONS_CSS_RULES_PARENT_STYLESHEET_ERROR;
    }

    const node: Element | ProcessingInstruction | null = sheet.ownerNode;
    if (node === null) {
      throw MISSING_REACT95_ICONS_STYLESHEET_OWNER_NODE_ERROR;
    }
    return node;
  }

  return null;
}
