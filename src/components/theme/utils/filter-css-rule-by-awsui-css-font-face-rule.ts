export default function filterCssRuleByAwsuiCssFontFaceRule(
  rule: Readonly<CSSRule>,
): boolean {
  return (
    rule instanceof CSSFontFaceRule &&
    rule.style.getPropertyValue('font-family') === '"Noto Sans"'
  );
}
