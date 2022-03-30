import mapCssRuleListToCssRules from '../utils/map-css-rule-list-to-css-rules';

const EMPTY_CSS_RULES: Set<CSSRule> = new Set();

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
