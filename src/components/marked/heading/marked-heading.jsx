import React from 'react';

export default function MarkedHeading({ children, depth }) {
  const Component = `h${depth}`;
  return <Component>{children}</Component>;
}
