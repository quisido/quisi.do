import filterCssRuleByCssFontFaceRule from '../utils/filter-css-rule-by-css-font-face-rule';

export default function mapCssRulesToCloudscapeGlobalStyleSheetElement(
  rules: Readonly<Set<CSSRule>>,
): Element | ProcessingInstruction | null {
  for (const rule of rules) {
    if (!filterCssRuleByCssFontFaceRule(rule)) {
      continue;
    }

    const sheet: CSSStyleSheet | null = rule.parentStyleSheet;
    if (sheet === null) {
      throw new Error(
        'Expected the Cloudscape global CSS rules to have a parent stylesheet.',
      );
    }

    const node: Element | ProcessingInstruction | null = sheet.ownerNode;
    if (node === null) {
      throw new Error(
        'Expected the Cloudscape global style sheet to have an owner node.',
      );
    }

    return node;
  }

  return null;
}
