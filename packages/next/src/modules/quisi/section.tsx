'use client';

import { useLayoutEffect, useState, type ReactElement, type ReactNode } from 'react';
import useTheme from '../../hooks/use-theme.js';
import createRandomNumberGenerator from '../../utils/create-random-number-generator.js';
import validateString from '../../utils/validate-string.js';
import Header from './header.js';
import styles from './section.module.scss';

export interface Props {
  readonly actions?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly header?: ReactNode | undefined;
}

const FOOTER_CLASS_NAME: string = validateString(styles['footer']);
const INITIAL_ROTATION = 0;
const MAXIMUM_ROTATION = -2;
const MINIMUM_ROTATION = -2;
const NEGATIVE = -1;
const SECTION_CLASS_NAME: string = validateString(styles['section']);

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
      className={SECTION_CLASS_NAME}
      style={{
        color: foregroundHex,
        transform: `rotate(${rotation}deg)`,
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
          <footer className={FOOTER_CLASS_NAME}>
            {actions}
          </footer>
        )}
      </div>
    </section>
  );
}
