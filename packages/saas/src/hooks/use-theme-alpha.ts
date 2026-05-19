import { useCallback } from 'react';

export default function useThemeAlpha(
  red: number,
  green: number,
  blue: number,
): (opacity: number) => string {
  return useCallback(
    (opacity: number): string => {
      const blueStr: string = blue.toString();
      const greenStr: string = green.toString();
      const opacityStr: string = opacity.toString();
      const redStr: string = red.toString();
      return `rgba(${redStr}, ${greenStr}, ${blueStr}, ${opacityStr})`;
    },
    [blue, green, red],
  );
}
