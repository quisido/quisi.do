import type { ReactElement } from 'react';
import { type Props } from '../../components/section.js';
import useTheme from '../../hooks/use-theme.js';

const BORDER_OPACITY = 0.05;
const ROTATION = '0.5deg';

export default function QuisiSection({
  actions,
  children,
  header,
}: Props): ReactElement {
  // Contexts
  const { backgroundColor, foregroundAlpha, foregroundHex } = useTheme();

  return (
    <section
      style={{
        backgroundColor,
        backgroundImage: `linear-gradient(${[
          'rgba(255, 255, 255, 0.75)',
          'rgba(255, 255, 255, 0.75)',
        ].join(', ')})`,
        borderColor: foregroundAlpha(BORDER_OPACITY),
        borderStyle: 'double',
        borderWidth: 4,
        borderRadius: '1em',
        color: foregroundHex,
        overflow: 'hidden',
        marginBottom: '1em',
        maxHeight: '100%',
        minHeight: '5em',
        maxWidth: '100%',
        padding: '1em',
        position: 'relative',
        transform: `rotate(${ROTATION})`,
        width: '100%',
      }}
    >
      <div
        style={{
          transform: `rotate(-${ROTATION})`,
        }}
      >
        {typeof header !== 'undefined' && <header>{header}</header>}
        {children}
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
