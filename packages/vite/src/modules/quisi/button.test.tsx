import { FullStory } from '@fullstory/browser';
import { render } from '@testing-library/react';
import { MockFullstory } from 'fullstory-react';
import { type PropsWithChildren, type ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import CustomThemeProvider from '../../features/custom-theme-provider.jsx';
import Button from './button.js';

const MOCK_FULLSTORY = Object.assign(vi.fn(), FullStory);

describe('Button', (): void => {
  it('should have a matching background and outline color', (): void => {
    const { baseElement } = render(
      <Button feature="test">test children</Button>,
      {
        wrapper({ children }: PropsWithChildren): ReactElement {
          return (
            <CustomThemeProvider>
              <MockFullstory FullStory={MOCK_FULLSTORY} orgId="test-org-id">
                {children}
              </MockFullstory>
            </CustomThemeProvider>
          );
        },
      },
    );

    const backgroundColor: string =
      baseElement.style.getPropertyValue('background-color');
    const outlineColor: string =
      baseElement.style.getPropertyValue('outline-color');
    expect(backgroundColor).toBe(outlineColor);
  });
});
