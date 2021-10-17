import type { Theme } from '@mui/material/styles';

export default function mapThemeToMuiNavigationPaperBackground(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  theme: Readonly<Theme>,
): string {
  if (theme.palette.mode === 'dark') {
    return theme.palette.primary.dark;
  }
  return '#f0f0f0';
}
