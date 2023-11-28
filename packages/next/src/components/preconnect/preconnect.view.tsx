import { type ReactElement } from 'react';
import mapHrefToElement from './utils/map-href-to-element';

interface Props {
  readonly hrefs: readonly string[];
}

export default function Preconnect({ hrefs }: Props): ReactElement {
  return <>{hrefs.map(mapHrefToElement)}</>;
}
