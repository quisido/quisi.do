import { type ReactElement, type ReactNode } from 'react';
import validateString from '../utils/validate-string.js';
import styles from './dark-mode-toggle-button.module.scss';

interface Props {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly label: string;
  readonly onClick: VoidFunction;
}

const CLASS_NAME: string = validateString(styles['button']);

export default function DarkModeToggleButton({
  children,
  className: classNameProp,
  label,
  onClick,
}: Props): ReactElement {
  const classNames: string[] = [CLASS_NAME];
  if (typeof classNameProp !== 'undefined') {
    classNames.push(classNameProp);
  }

  const className: string = classNames.join(' ');
  return (
    <button
      aria-label={label}
      className={className}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
