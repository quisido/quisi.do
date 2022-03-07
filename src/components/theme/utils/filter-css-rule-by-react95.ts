export default function filterCssRuleByReact95(
  rule: Readonly<CSSRule>,
): boolean {
  return (
    rule instanceof CSSStyleRule &&
    rule.selectorText === '.WindowsExplorer_32x32_1'
  );
}
