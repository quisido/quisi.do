const DEFAULT_FONT_SIZE = 16;

export default function mapHtmlElementToFontSize(elt: Element): number {
  const declaration: CSSStyleDeclaration = getComputedStyle(elt);
  const fontSizeStr: string = declaration.getPropertyValue('font-size');
  const fontSizeNum: number = parseFloat(fontSizeStr);

  if (isNaN(fontSizeNum)) {
    return DEFAULT_FONT_SIZE;
  }

  return fontSizeNum;
}
