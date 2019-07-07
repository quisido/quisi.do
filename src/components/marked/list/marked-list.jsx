import React from 'react';

/*
interface Props {
  loose: boolean;
  ordered: boolean;
  start: string;
}
*/

export default function MarkedList({ children, ordered }) {
  const Component = ordered ? 'ol' : 'ul';
  return <Component>{children}</Component>;
}