import type { ReactElement } from 'react';
import validateString from '../../../../utils/validate-string';
import useBionicWord from './bionic-word.hook';
import styles from './bionic-word.module.scss';

interface Props {
  readonly children: string;
}

const START = 0;
const rootClassName: string = validateString(styles.root);

export default function BionicWord({ children }: Props): ReactElement {
  const highlightLength: number = useBionicWord(children);

  return (
    <>
      <span className={rootClassName}>
        {children.slice(START, highlightLength)}
      </span>
      {children.slice(highlightLength)}
    </>
  );
}
