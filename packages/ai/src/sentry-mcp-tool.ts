export const SENTRY_TOOL: AiTextGenerationToolLegacyInput = {
  description:
    'Search Sentry for existing issues related to the error message to find fix instructions.',
  name: 'search_sentry_issues',
  parameters: {
    properties: {
      query: {
        description: 'The error message or exception type to search for.',
        type: 'string',
      },
    },
    required: ['query'],
    type: 'object',
  },
};
