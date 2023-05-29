import FONT_FAMILIES from '../constants/font-families';

export default function filterCssRuleByCloudscapeCssFontFaceRule(
  rule: Readonly<CSSRule>,
): boolean {
  if (!(rule instanceof CSSFontFaceRule)) {
    return false;
  }

  const fontFamily: string = rule.style.getPropertyValue('font-family');
  return FONT_FAMILIES.has(fontFamily);
}
