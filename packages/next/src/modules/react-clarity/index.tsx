'use client';

import { type ReactElement } from 'react';

interface Props {
  readonly tag: string;
}

/**
 *   We have to initiate `window.clarity` synchronously, because `<head>`
 * scripts will begin loading before `useLayoutEffect`s fire, since effect hooks
 * won't fire until the application bundle has loaded.
 */
const SCRIPT = `
(function(w, c){
  w[c] = function clarity() {
    w[c].q.push(arguments);
  };
  w[c].q = new Array();
})(window, 'clarity');
`;

export default function Clarity({ tag }: Props): ReactElement {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: SCRIPT }}
        type="text/javascript"
      />
      <script
        async
        src={`https://www.clarity.ms/tag/${tag}`}
        type="text/javascript"
      />
    </>
  );
}
