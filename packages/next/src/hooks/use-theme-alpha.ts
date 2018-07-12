import { useCallback } from 'react';

export default function useThemeAlpha(
  red: number,
  green: number,
  blue: number,
): (opacity: number) => string {
  return useCallback(
    (opacity: number): string => `rgba(${red}, ${green}, ${blue}, ${opacity})`,
    [blue, green, red],
  );
}
