import type { ReactElement } from 'react';
import useTheme from '../hooks/use-theme.js';
import Text from './header-heading-text.jsx';

interface State {
  readonly fontFamily: string;
  readonly fontWeight: number;
}

function useHeaderHeading(): State {
  const { displayFontFamily, displayFontWeight } = useTheme();

  return {
    fontFamily: `"Cairo Play", ${displayFontFamily}`,
    fontWeight: displayFontWeight,
  };
}

export default function Heading(): ReactElement {
  const { fontFamily, fontWeight } = useHeaderHeading();

  return (
    <h1
      style={{
        fontFamily,
        fontSize: '3em',
        fontWeight,
        lineHeight: '4rem',
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        padding: 0,
        textAlign: 'left',
      }}
    >
      <Text />
    </h1>
  );
}
