import AWSUI_FONT_FAMILIES from '../constants/awsui-font-families';

export default function filterCssRuleByAwsuiCssFontFaceRule(
  rule: Readonly<CSSRule>,
): boolean {
  if (!(rule instanceof CSSFontFaceRule)) {
    return false;
  }

  const fontFamily: string = rule.style.getPropertyValue('font-family');
  return AWSUI_FONT_FAMILIES.has(fontFamily);
}
