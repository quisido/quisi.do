import type { ReactElement } from 'react';
import { type Props } from '../../../components/section';
import useTheme from '../../../hooks/use-theme';

const ROTATION = '0.5deg';

export default function QuisiSection({
  actions,
  children,
  header,
}: Props): ReactElement {
  // Contexts
  const { backgroundColor, foregroundColor } = useTheme();

  return (
    <section
      style={{
        backgroundColor,
        color: foregroundColor,
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
