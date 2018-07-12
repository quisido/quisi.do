export default function mapColorToMuiColor(
  color: 'inherit' | 'label' | 'secondary-body',
): 'inherit' | 'text.secondary' {
  switch (color) {
    case 'inherit':
      return 'inherit';
    case 'label':
    case 'secondary-body':
      return 'text.secondary';
  }
}
