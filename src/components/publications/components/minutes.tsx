import { ReactElement } from 'react';

interface Props {
  children: number;
}

export default function Minutes({ children }: Props): ReactElement {
  switch (children) {
    case 1:
      return <>1 minute</>;
    default:
      return <>{children} minutes</>;
  }
}
