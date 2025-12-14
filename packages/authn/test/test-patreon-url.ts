const TEST_PATREON_STATE: string = JSON.stringify({
  returnPath: '/test-return-path/',
  sessionId: 'test-session-id',
});

const TEST_PATREON_SEARCH: string = new URLSearchParams({
  code: 'test-code',
  state: TEST_PATREON_STATE,
}).toString();

export const TEST_PATREON_URL = `/patreon/?${TEST_PATREON_SEARCH}`;
