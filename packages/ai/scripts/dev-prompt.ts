/// <reference types="bun-types" />
import ollama, { type AbortableAsyncIterator, type ChatResponse } from 'ollama';

enum Model {
  DeepSeek_R1_14b = 'deepseek-r1:14b',
  Qwen3_14b = 'qwen3:14b',
  Qwen3_Coder_30b = 'qwen3-coder:30b',
}

enum Role {
  Assistant = 'assistant',
  // Error = 'error',
  /**
   *   This role is used for system-level instructions or messages that guide
   * the behavior of the assistant. For example, you might use a "system"
   * message to set the tone, define constraints, or provide context for the
   * conversation.
   */
  System = 'system',
  // ToolCall = 'tool_call',
  // ToolResponse = 'tool_response',
  User = 'user',
}

const MAX_ATTEMPTS = 3;
const THINKING_MODELS = new Set<Model>([
  Model.DeepSeek_R1_14b,
  Model.Qwen3_14b,
]);

const SYSTEM_PROMPT: Record<'eslint' | 'vitest', string> = {
  eslint: `You are a specialized ESLint and Static Analysis architect. You view code through the lens of strict maintainability and type safety.

## Constraints

When presented with an ESLint error, first explain the underlying best practice that motivates the rule exists.
Do not suggest \`eslint-disable\` comments.
If the error involves TypeScript types, prioritize fixing the \`interface\` or \`type\` definition over using \`any\`.`,
  vitest: `You are a Vitest Debugging Agent. You approach failures using a 'Red-Green-Refactor' mental model.

Always follow these steps:
1. Identify the 'Actual' vs 'Expected' values in the failed assertion.
2. Trace the data flow from the test setup (BeforeEach/Mocks) to the failing line.
3. Check for common 'Test Smells': Unawaited promises, shared state between tests, or leaked timers.
4. Provide a failure summary: A concise explanation of why the assertion failed.
5. Identify if the culprit is a logic error, a mocking failure, or an environment issue (e.g., missing env vars).
6. Provide the exact code patch to fix the failure.`,
};

export default async function chat(
  model: Model,
  prompt: string,
): Promise<string> {
  const chatImpl = async (attempt: number): Promise<string> => {
    try {
      const responseItr: AbortableAsyncIterator<ChatResponse> =
        await ollama.chat({
          messages: [
            { content: SYSTEM_PROMPT.eslint, role: Role.System },
            { content: prompt, role: Role.User },
          ],
          model,
          stream: true,
          think: THINKING_MODELS.has(model),
        });

      const contents: string[] = [];
      for await (const { message } of responseItr) {
        contents.push(message.content);
      }

      const message: string = contents.join('');

      return message;
    } catch (err: unknown) {
      if (attempt >= MAX_ATTEMPTS) {
        throw new Error(
          'Failed to get response from Ollama after 3 attempts.',
          { cause: err },
        );
      }

      return chatImpl(attempt + 1);
    }
  };

  return chatImpl(1);
}

const [, , prompt] = process.argv;
if (prompt === undefined) {
  throw new Error(`No prompt provided.`);
}

const response: string = await chat(Model.Qwen3_Coder_30b, prompt);

// eslint-disable-next-line no-console
console.log(response);
