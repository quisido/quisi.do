const INCREMENT = 1;

export default function mapCssRuleListToCssRules(
  list: Readonly<CSSRuleList>,
): Set<CSSRule> {
  const rules = new Set<CSSRule>();

  const ruleCount: number = list.length;
  for (let ri = 0; ri < ruleCount; ri += INCREMENT) {
    const rule: CSSRule | null = list.item(ri);
    if (rule === null) {
      break;
    }
    rules.add(rule);
  }

  return rules;
}
