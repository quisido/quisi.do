import type { CSSProperties } from 'react';

export default function mapIconToStyle(icon: string): CSSProperties {
  return {
    listStyleType: `"${icon}"`,
  };
}
