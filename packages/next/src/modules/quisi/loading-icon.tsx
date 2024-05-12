import Image from 'next/image';
import type { CSSProperties, ReactElement } from 'react';
import src from './loading-icon.gif';

const IMG_STYLE: CSSProperties = {
  clipPath: 'ellipse(33% 20%)',
  height: '233%',
  width: '133%',
};

const SPAN_STYLE: CSSProperties = {
  alignItems: 'center',
  display: 'inline-flex',
  height: '1em',
  justifyContent: 'center',
  overflow: 'hidden',
  width: '1.33em',
};

export default function LoadingIcon(): ReactElement {
  return (
    <span style={SPAN_STYLE}>
      <Image alt="Loading" src={src} style={IMG_STYLE} unoptimized />
    </span>
  );
}
