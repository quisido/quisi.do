import { type PropsWithChildren, type ReactElement } from 'react';
import validateString from '../utils/validate-string.js';
import styles from './emoji.module.scss';

const CLASS_NAME: string = validateString(styles['emoji']);

export default function Emoji({ children }: PropsWithChildren): ReactElement {
  return <span className={CLASS_NAME}>{children}</span>;
}
