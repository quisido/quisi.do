'use client';

import { type ReactElement, useEffect } from "react";

interface Clarity {
  (): void;
  q: IArguments[];
}

interface Props{
  readonly tag: string;
}

export default function Clarity({tag}: Props): ReactElement {
  useEffect((): void => {
    if (
      typeof window === 'undefined' ||
      'clarity' in window
    ) {
      return;
    }

    const clarity: Clarity = function(): void {
      clarity.q.push(arguments);
    };
    clarity.q = [];

    Object.defineProperty(
      window,
      'clarity', {
        value: clarity,
      },
    );
  }, []);

  return <script async src={`https://www.clarity.ms/tag/${tag}`} />;
}
