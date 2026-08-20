import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Time } = await importTestedDesignSystem();

describe('Time', (): void => {
  it('should expose valid date and time strings', (): void => {
    const validTimes = [
      '2019-11',
      '2019-11-18',
      '11-18',
      '09:54:39',
      '2019-11-18T14:54',
      '-08:00',
      '2019-11-18T14:54Z',
      '2019-W47',
      '0001',
      '4h 18m 3s',
    ] as const;

    for (const validTime of validTimes) {
      const { getByRole } = render(<Time>{validTime}</Time>);
      expect(getByRole('time')).toHaveTextContent(validTime);
    }
  });
});
