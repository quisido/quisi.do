import { type PropsWithChildren } from 'react';
import isRecord from '../../../utils/is-record.js';

export default function isPropsWithChildren(
  value: unknown,
): value is PropsWithChildren {
  return isRecord(value) && 'children' in value;
}
