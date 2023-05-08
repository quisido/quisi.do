import filterCssRuleByAwsuiCssFontFaceRule from '../utils/filter-css-rule-by-awsui-css-font-face-rule';

export default function mapCssRulesToAwsuiGlobalStyleSheetElement(
  rules: Readonly<Set<CSSRule>>,
): Element | ProcessingInstruction | null {
  for (const rule of rules) {
    if (!filterCssRuleByAwsuiCssFontFaceRule(rule)) {
      continue;
    }

    const sheet: CSSStyleSheet | null = rule.parentStyleSheet;
    if (sheet === null) {
      throw new Error(
        'Expected the AWS UI global CSS rules to have a parent stylesheet.',
      );
    }

    const node: Element | ProcessingInstruction | null = sheet.ownerNode;
    if (node === null) {
      throw new Error(
        'Expected the AWS UI global style sheet to have an owner node.',
      );
    }
    return node;
  }

  return null;
}
