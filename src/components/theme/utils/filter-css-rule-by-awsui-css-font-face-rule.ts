export default function filterCssRuleByAwsuiCssFontFaceRule(
  rule: Readonly<CSSRule>,
): boolean {
  return (
    rule instanceof CSSFontFaceRule && rule.style.fontFamily === '"Noto Sans"'
  );
}
