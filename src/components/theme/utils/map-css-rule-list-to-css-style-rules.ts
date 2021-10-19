export default function mapCssRuleListToCssStyleRules(
  list: Readonly<CSSRuleList>,
): Set<CSSRule> {
  const rules: Set<CSSRule> = new Set();

  const ruleCount: number = list.length;
  for (let i = 0; i < ruleCount; i++) {
    const rule: CSSRule | null = list.item(i);
    if (rule === null) {
      break;
    }
    rules.add(rule);
  }

  return rules;
}
