export default function mapColorToMuiColor(
  color: 'label' | 'secondary-body',
): 'text.secondary' {
  switch (color) {
    case 'label':
    case 'secondary-body':
      return 'text.secondary';
  }
}
