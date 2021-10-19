import mapCssRuleListToCssStyleRules from '../utils/map-css-rule-list-to-css-style-rules';

export default function mapCssStyleSheetToCssStyleRules(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  sheet: Readonly<CSSStyleSheet>,
): Set<CSSRule> {
  try {
    return mapCssRuleListToCssStyleRules(sheet.cssRules);
  } catch (_err: unknown) {
    // Ignore errors when access to `cssRules` is forbidden.
    return new Set();
  }
}
