'use client';

import { type ReactElement, useRef } from 'react';
import type { Props } from '../../components/banner.js';
import Emoji from '../../components/emoji.js';
import useTheme from '../../hooks/use-theme.js';
import { useButton } from '@react-aria/button';
import optional from '../../utils/optional.js';

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
