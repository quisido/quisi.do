import mapCssRuleListToCssRules from '../utils/map-css-rule-list-to-css-rules.js';

const EMPTY_CSS_RULES = new Set<CSSRule>();

export default function mapCssStyleSheetToCssRules(
  sheet: Readonly<CSSStyleSheet>,
): Set<CSSRule> {
  try {
    return mapCssRuleListToCssRules(sheet.cssRules);
  } catch (_err: unknown) {
    // Ignore errors when access to `cssRules` is forbidden.
    return EMPTY_CSS_RULES;
  }
}
