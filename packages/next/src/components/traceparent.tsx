import type { ReactElement } from 'react';

const HEX = '0123456789abcdef';
const SPAN_ID_LENGTH = 16;
const TRACE_ID_LENGTH = 32;

const getRandomHex = (): string =>
  HEX.charAt(Math.floor(Math.random() * HEX.length));

const SPAN_ID: string = new Array(SPAN_ID_LENGTH)
  .fill(null)
  .map(getRandomHex)
  .join('');

const TRACE_ID: string = new Array(TRACE_ID_LENGTH)
  .fill(null)
  .map(getRandomHex)
  .join('');

const TRACEPARENT = `00-${TRACE_ID}-${SPAN_ID}-00`;

export default function Traceparent(): ReactElement {
  return <meta name="traceparent" content={TRACEPARENT} />;
}
