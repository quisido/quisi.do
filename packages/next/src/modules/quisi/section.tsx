'use client';

import { useLayoutEffect, useState, type ReactElement, type ReactNode } from 'react';
import useTheme from '../../hooks/use-theme.js';
import createRandomNumberGenerator from '../../utils/create-random-number-generator.js';
import Header from './header.js';

export interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly header?: ReactNode | undefined;
}

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
        marginBottom: '1rem',
        marginTop: '1rem',
        maxHeight: '100%',
        maxWidth: '100%',
        paddingLeft: '2em',
        paddingRight: '2em',
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
        {typeof header !== 'undefined' && <Header>{header}</Header>}
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
