import { useButton } from '@react-aria/button';
import { useLink } from '@react-aria/link';
import {
  useRef,
  type CSSProperties,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import useElementId from '../../hooks/use-element-id.js';
import useEmit from '../../hooks/use-emit/index.js';
import useTheme from '../../hooks/use-theme.js';
import optional from '../../utils/optional.js';
import validateString from '../../utils/validate-string.js';
import styles from './button.module.scss';

interface ButtonElementProps {
  readonly className: string;
  readonly id: string;
  readonly onPress: VoidFunction;
  readonly style: CSSProperties;
}

interface ElementProps {
  readonly className: string;
  readonly href?: string | undefined;
  readonly id: string;
  readonly onPress: VoidFunction;
  readonly style: CSSProperties;
}

interface LinkElementProps {
  readonly className: string;
  readonly href: string;
  readonly id: string;
  readonly onPress: VoidFunction;
  readonly style: CSSProperties;
}

export interface Props {
  readonly children: ReactNode;
  readonly feature: string;
  readonly href?: string | undefined;
  readonly onClick?: VoidFunction | undefined;
}

const CLASS_NAME: string = validateString(styles['button']);

function ButtonElement({
  children,
  className,
  id,
  onPress,
  style,
}: PropsWithChildren<ButtonElementProps>): ReactElement {
  const { buttonProps } = useButton(
    {
      onPress,
    },
    useRef(null),
  );

  return (
    <button {...buttonProps} className={className} id={id} style={style}>
      {children}
    </button>
  );
}

function LinkElement({
  children,
  className,
  href,
  id,
  onPress,
  style,
}: PropsWithChildren<LinkElementProps>): ReactElement {
  const { linkProps } = useLink(
    {
      ...optional('href', href),
      onPress,
    },
    useRef(null),
  );

  return (
    <a {...linkProps} className={className} id={id} style={style}>
      {children}
    </a>
  );
}

function Element({
  children,
  className,
  href,
  id,
  onPress,
  style,
}: PropsWithChildren<ElementProps>): ReactElement {
  if (typeof href === 'undefined') {
    return (
      <ButtonElement
        className={className}
        id={id}
        onPress={onPress}
        style={style}
      >
        {children}
      </ButtonElement>
    );
  }

  return (
    <LinkElement
      className={className}
      href={href}
      id={id}
      onPress={onPress}
      style={style}
    >
      {children}
    </LinkElement>
  );
}

export default function Button({
  children,
  feature,
  href,
  onClick,
}: Props): ReactElement {
  // Contexts
  const emit = useEmit();
  const { backgroundHex, primaryFontWeight, primaryHex } = useTheme();

  // States
  const id: string = useElementId();

  return (
    <>
      <style type="text/css">{`
#${id}:not(:focus-visible) {
  outline-color: ${backgroundHex};
}
`}</style>
      <Element
        className={CLASS_NAME}
        href={href}
        id={id}
        onPress={(): void => {
          if (typeof onClick === 'function') {
            onClick();
          }

          emit('button.click', {
            feature,
          });
        }}
        style={{
          backgroundColor: backgroundHex,
          borderColor: primaryHex,
          borderImageSource: `repeating-linear-gradient(45deg, ${primaryHex}, ${primaryHex} 1px, ${backgroundHex} 1px, ${backgroundHex} 4px)`,
          fontWeight: primaryFontWeight,
        }}
      >
        {children}
      </Element>
    </>
  );
}
