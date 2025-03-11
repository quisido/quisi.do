import type { ReactElement } from 'react';
import Meticulous from '../components/meticulous.jsx';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

export default function MeticulousImpl(): ReactElement | null {
  if (!isDevelopment) {
    return null;
  }

  return (
    <Meticulous recordingToken="l319LZzhQ6B40Z5cjuFGZxrlrN5yehIlLnG62JYB" />
  );
}
