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
  const { backgroundColor, foregroundHex } = useTheme();

  // States
  const [rotation, setRotation] = useState(INITIAL_ROTATION);

  // Effects
  useLayoutEffect((): void => {
    setRotation(getRotation);
  }, []);

  return (
    <section
      style={{
        backgroundColor,
        // backgroundImage: `linear-gradient(${[
        //   'rgba(255, 255, 255, 0.5)',
        //   'rgba(255, 255, 255, 0.5)',
        // ].join(', ')})`,
        boxSizing: 'border-box',
        color: foregroundHex,
        overflow: 'hidden',
        marginBottom: '1em',
        maxHeight: '100%',
        minHeight: '5em',
        maxWidth: '100%',
        padding: '1em',
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
        {typeof header !== 'undefined' && <header>{header}</header>}
        <div
          style={{
            paddingBottom: '1em',
            paddingTop: '1em',
          }}
        >
          {children}
        </div>
        {typeof actions !== 'undefined' && (
          <footer
            style={{
              paddingTop: '1em',
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
