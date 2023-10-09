import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import inner from '../test-utils/inner.js';
import replaceVariables from './replace-variables.js';

describe('replaceVariables', (): void => {
  it('should return strings with no variables', (): void => {
    expect(replaceVariables('test')).toBe('test');
  });

  it('should replace string variables', (): void => {
    expect(
      replaceVariables('my $one $two $three string', {
        one: 1,
        two: 'two',
        three: 3,
      }),
    ).toBe('my 1 two 3 string');
  });

  it('should replace React node variables', (): void => {
    function TestHello(): ReactElement {
      return <strong>olleh</strong>;
    }
    function TestWorld(): ReactElement {
      return <em>dlrow</em>;
    }
    const { getByText } = render(
      <>
        {replaceVariables('$hello, $world? $n! $world $hello.', {
          hello: <TestHello />,
          n: 1234,
          world: <TestWorld />,
        })}
      </>,
    );
    getByText(inner('olleh, dlrow? 1234! dlrow olleh.'));
  });
});
