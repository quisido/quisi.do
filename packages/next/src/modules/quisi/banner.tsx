'use client';

import { useButton } from '@react-aria/button';
import { useRef, type ReactElement, type ReactNode } from 'react';
import Emoji from '../../components/emoji.js';
import useTheme from '../../hooks/use-theme.js';
import optional from '../../utils/optional.js';

export interface Props {
  readonly children: ReactNode;
  readonly icon?: string | undefined;
  readonly onDismiss?: VoidFunction | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

export default function Banner({
  children,
  icon,
  onDismiss,
}: Props): ReactElement {
  // Contexts
  const { secondaryHex } = useTheme();

  // States
  const { buttonProps } = useButton(
    {
      ...optional('onPress', onDismiss),
    },
    useRef(null),
  );

  return (
    <aside
      style={{
        backgroundColor: secondaryHex,
        borderColor: secondaryHex,
        borderStyle: 'outset',
        borderWidth: '0 0 1px 0',
        boxSizing: 'border-box',
        color: '#002010',
        display: 'flex',
        fontSize: '1em',
        gap: '0.5em',
        lineHeight: '1em',
        padding: '0.5em 1em',
        width: '100%',
      }}
    >
      {typeof icon === 'string' && (
        <>
          <Emoji>{icon}</Emoji>{' '}
        </>
      )}
      <div
        style={{
          flexGrow: 1,
        }}
      >
        {children}
      </div>
      <button
        {...buttonProps}
        style={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <Emoji>❌</Emoji>
      </button>
    </aside>
  );
}
