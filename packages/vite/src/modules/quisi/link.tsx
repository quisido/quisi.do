import {
  useEffect,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import innerText from 'react-innertext';
import useEmit from '../../hooks/use-emit/use-emit.js';
import useTheme from '../../hooks/use-theme.js';
import useNavigation from '../../hooks/use-navigation.js';

interface BaseProps {
  readonly children?: ReactNode;
  readonly className?: string | undefined;
  readonly follow?: boolean | undefined;
  readonly label?: string | undefined;
  readonly title: string;

  // Used for tracking events
  readonly feature: string;
}

interface HrefProps {
  readonly href: string;
  readonly onClick?: (() => boolean) | undefined;
}

interface OnClickProps {
  readonly href?: string | undefined;
  readonly onClick: () => undefined;
}

export type Props = BaseProps & (HrefProps | OnClickProps);

export default function Link({
  children,
  className,
  feature,
  follow = true,
  href,
  label: ariaLabel,
  onClick,
  title,
}: Props): ReactElement {
  const getInitialTarget = (): string | undefined => {
    if (follow) {
      return;
    }
    return '_blank';
  };

  // Contexts
  const emit = useEmit();
  const navigate = useNavigation();
  const { primaryHex } = useTheme();

  // States
  const [target, setTarget] = useState(getInitialTarget);

  // Callbacks
  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (target !== '_blank') {
      event.preventDefault();
    }

    emit('click', {
      feature,
      label: innerText(children),
      url: href,
    });

    if (typeof onClick === 'function') {
      const preventDefault: boolean | undefined = onClick();
      if (preventDefault === true) {
        return;
      }
    }

    if (target !== '_blank' && typeof href === 'string') {
      navigate(href);
    }
  };

  useEffect((): void => {
    if (typeof href === 'undefined') {
      return;
    }

    try {
      const { host: hrefHost } = new URL(href);
      const { host: locationHost } = window.location;
      if (hrefHost !== locationHost) {
        setTarget('_blank');
      }
    } catch (_err: unknown) {
      // If the `href` is a relative path, the host is implicitly the same.
    }
  }, [href]);

  const getRel = (): string => {
    const rels: string[] = ['noopener'];
    if (!follow) {
      rels.push('nofollow');
    }

    return rels.join(' ');
  };

  const rel: string | undefined = getRel();
  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={href}
      onClick={handleClick}
      rel={rel}
      target={target}
      title={title}
      style={{
        color: primaryHex,
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}
