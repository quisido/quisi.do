import { type ReactElement } from 'react';
import validateString from '../utils/validate-string.js';
import DarkModeToggle from './dark-mode-toggle.jsx';
import NotebookToggle from './notebook-toggle.jsx';
import styles from './status-bar.module.scss';

const CLASS_NAME: string = validateString(styles['status']);

export default function StatusBar(): ReactElement {
  return (
    <div className={CLASS_NAME}>
      <DarkModeToggle />
      <NotebookToggle />
    </div>
  );
}
