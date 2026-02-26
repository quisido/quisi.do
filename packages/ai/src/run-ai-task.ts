import fetchSentryData from './fetch-sentry-data.js';
import { Role } from './role.js';
import { SYSTEM_MESSAGE } from './system-message.js';
import type Task from './task.js';
import TaskMessage from './task-message.js';
import { DEFAULT_USAGE_TAGS } from './default-usage-tags.js';

/**
 * Running an AI task involves:
 * 1. Calling an AI model with the task context.
 * 2. Executing any tools requested by the AI model's response.
 * 3. Calling the AI model again with the tool results.
 */

const MAX_ATTEMPTS = 2;

export default async function runAiTask(
  ai: Ai,
  { data, dataType, goal, model, tools }: Task,
): Promise<string> {
  const taskMessage = new TaskMessage({
    data,
    dataType,
    goal,
    hasTools: tools.length > 0,
  });

  const initiateTask = async (
    attempt: number = 1,
  ): Promise<AiTextGenerationOutput> => {
    const output: AiTextGenerationOutput = (await ai.run(
      model as unknown as keyof AiModels,
      // Warning: This shape depends on the model specified above.
      {
        messages: [SYSTEM_MESSAGE, taskMessage],
        /**
         * Force a JSON response:
        response_format: {
          json_schema: {
            properties: {
              capital: {
                type: 'string',
              },
              languages: {
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              name: {
                type: 'string',
              },
            },
            required: ['name', 'capital', 'languages'],
            type: 'object',
          },
          type: 'json_schema',
        },
         */
        tools,
      },
    )) as AiTextGenerationOutput;

    // WARNING: EMIT USAGE METRICS HERE, EVEN IF RETRYING THE ATTEMPT

    // If there is a text response or a tool call, proceed.
    if (output.response !== undefined || (output.tool_calls ?? []).length > 0) {
      return output;
    }

    // Otherwise, if we are willing to retry, try again.
    if (attempt < MAX_ATTEMPTS) {
      return await initiateTask(attempt + 1);
    }

    // Otherwise, give up.
    return output;
  };

  const {
    response: initialResponse,
    tool_calls: initialToolCalls = [],
    /**
     *   Warning: Be sure NOT to double-emit this usage, if it's already emit in
     * the `initiateTask` function.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    usage: _initialUsage = DEFAULT_USAGE_TAGS,
  } = await initiateTask();

  const toolMessages: RoleScopedChatInput[] = [];

  for (const {
    arguments: toolCallArguments,
    name: toolName,
  } of initialToolCalls) {
    switch (toolName) {
      case 'search_sentry_issues': {
        const { query } = toolCallArguments as { query: string };

        // Execute the actual Sentry API call (mimicking MCP execution)
        // eslint-disable-next-line no-await-in-loop
        const sentryData = await fetchSentryData(
          query,
          'env.SENTRY_AUTH_TOKEN',
        );

        toolMessages.push({
          content: JSON.stringify(sentryData),
          name: toolName,
          role: Role.Tool,
        });
        break;
      }

      default: {
        // console.error(`Unknown tool called: ${toolCall.name}`);
        break;
      }
    }
  }

  // If any tool calls were valid, call them.
  if (toolMessages.length > 0) {
    // Prepend the AI model's own response, if there was one.
    if (initialResponse !== undefined) {
      toolMessages.unshift({
        content: initialResponse,
        role: Role.Assistant,
      });
    }

    const {
      response: finalResponse,
      tool_calls: finalToolCalls = [],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      usage: _finalUsage = DEFAULT_USAGE_TAGS,
    } = (await ai.run(model as unknown as keyof AiModels, {
      messages: [SYSTEM_MESSAGE, taskMessage, ...toolMessages],
      /**
       *   While we can remove this to produce just a summary, we include it so
       * that the model remembers the tool definitions. If models keep getting
       * stuck on repeated tool calls, we can remove this.
       */
      tools,
    })) as AiTextGenerationOutput;

    if (finalResponse !== undefined) {
      return finalResponse;
    }

    if (finalToolCalls.length === 0) {
      if (initialResponse !== undefined) {
        /**
         *   TODO: This function should return the `response` separately from
         * this informative description so that it can be formatted for display
         * by the caller.
         */
        return `The AI model failed to respond to its tool calls, but gave an initial response: ${initialResponse}`;
      }

      throw new Error(`The AI model failed to respond to its tool calls.`, {
        cause: initialToolCalls,
      });
    }

    if (initialResponse !== undefined) {
      return `The AI model responded to its tool calls with more tool calls, but gave an initial response:A ${initialResponse}`;
    }

    throw new Error(
      `The AI model responded to its tool calls with more tool calls.`,
      { cause: { finalToolCalls, initialToolCalls } },
    );
  }

  // If no tool calls were valid, provide the initial response.
  if (initialResponse !== undefined) {
    return initialResponse;
  }

  // Otherwise, throw an error.
  throw new Error(
    `The AI model did not respond after ${MAX_ATTEMPTS} attempts.`,
    { cause: { data, dataType, goal, model, tools } },
  );
}
