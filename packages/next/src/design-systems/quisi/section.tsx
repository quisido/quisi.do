import { type ReactElement, useLayoutEffect, useState } from 'react';
import { type Props } from '../../components/section.js';
import useTheme from '../../hooks/use-theme.js';
import createRandomNumberGenerator from '../../utils/create-random-number-generator.js';

const INITIAL_ROTATION = 0;
const MAXIMUM_ROTATION = -2;
const MINIMUM_ROTATION = -2;
const NEGATIVE = -1;

const getRotation = createRandomNumberGenerator(
  MINIMUM_ROTATION,
  MAXIMUM_ROTATION,
);

export default function QuisiSection({
  actions,
  children,
  header,
}: Props): ReactElement {
  // Contexts
  const { foregroundHex } = useTheme();

  // States
  const [rotation, setRotation] = useState(INITIAL_ROTATION);

  // Effects
  useLayoutEffect((): void => {
    setRotation(getRotation);
  }, []);

  return (
    <section
      style={{
        boxSizing: 'border-box',
        color: foregroundHex,
        overflow: 'hidden',
        marginBottom: '1rem',
        maxHeight: '100%',
        minHeight: '5rem',
        maxWidth: '100%',
        padding: '1rem 2em',
        position: 'relative',
        transform: `rotate(${rotation}deg)`,
        width: '100%',
      }}
    >
      <div
        style={{
          transform: `rotate(${NEGATIVE * rotation}deg)`,
        }}
      >
        {typeof header !== 'undefined' && (
          <header
            style={{
              paddingBottom: '1rem',
            }}
          >
            {header}
          </header>
        )}
        <div>{children}</div>
        {typeof actions !== 'undefined' && (
          <footer
            style={{
              paddingTop: '1rem',
              textAlign: 'right',
            }}
          >
            {actions}
          </footer>
        )}
      </div>
    </section>
  );
}
