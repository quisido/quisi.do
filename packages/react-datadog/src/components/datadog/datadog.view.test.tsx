import { render } from '@testing-library/react';
import Datadog from '../..';

describe('Datadog', (): void => {
  it('should render children', (): void => {
    const { getByText } = render(
      <Datadog
        applicationId="test-application-id"
        clientToken="test-client-token"
      >
        Hello world
      </Datadog>,
    );
    getByText('Hello world');
  });
});
