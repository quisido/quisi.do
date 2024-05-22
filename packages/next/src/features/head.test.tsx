import { render } from "@testing-library/react";
import type { Container } from "react-dom";
import { beforeEach, describe, expect, it } from 'vitest';
import Head from "./head.jsx";

const NONE = 0;

describe('Head', (): void => {
  beforeEach((): void => {
    Object.defineProperty(document, 'body', {
      value: window.document.createElement('body'),
    });
  });

  it('should preconnect', (): void => {
    const { container } = render(<Head />, {
      container: window.document as Container,
    });

    const preconnects = container.querySelectorAll('link[rel="preconnect"]');
    expect(preconnects.length).toBeGreaterThan(NONE);
  });
});
