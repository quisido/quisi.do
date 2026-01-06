import { type ReactElement } from 'react';
import useTheme from '../hooks/use-theme.js';
import validateString from '../utils/validate-string.js';
import Text from './header-heading-text.jsx';
import styles from './header-heading.module.scss';

interface State {
  readonly fontFamily: string;
  readonly fontWeight: number;
}

const CLASS_NAME: string = validateString(styles['heading']);

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
      className={CLASS_NAME}
      style={{
        fontFamily,
        fontWeight,
      }}
    >
      <Text />
    </h1>
  );
}
