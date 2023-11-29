'use client';

import { type ReactElement, useEffect } from 'react';

interface ClarityApi {
  (): void;
  q: IArguments[];
}

interface Props {
  readonly tag: string;
}

export default function Clarity({ tag }: Props): ReactElement {
  useEffect((): void => {
    if (typeof window === 'undefined' || 'clarity' in window) {
      return;
    }

    const clarity: ClarityApi = function(): void {
      clarity.q.push(arguments);
    };
    clarity.q = [];

    Object.defineProperty(window, 'clarity', {
      value: clarity,
    });
  }, []);

  return (
    <script
      async
      src={`https://www.clarity.ms/tag/${tag}`}
      type="text/javascript"
    />
  );
}
