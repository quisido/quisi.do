const INCREMENT = 1;

export default function mapCssRuleListToCssRules(
  list: Readonly<CSSRuleList>,
): Set<CSSRule> {
  const rules = new Set<CSSRule>();

  const ruleCount: number = list.length;
  for (let i = 0; i < ruleCount; i += INCREMENT) {
    const rule: CSSRule | null = list.item(i);
    if (rule === null) {
      break;
    }
    rules.add(rule);
  }

  return rules;
}
