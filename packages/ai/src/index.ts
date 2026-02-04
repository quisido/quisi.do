/// <reference types="bun-types" />
import { mapToString } from 'fmrs';
import ollama, {
  type AbortableAsyncIterator,
  type ChatResponse,
  type Message,
} from 'ollama';

interface Options {
  readonly onChunk: (chunk: string) => void;
}

enum Model {
  DeepSeek_R1_14b = 'deepseek-r1:14b',
  Qwen3_14b = 'qwen3:14b',
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

export default async function chat(
  model: Model,
  prompt: string,
  { onChunk }: Options,
): Promise<Message> {
  const messages: Message[] = [{ content: prompt, role: Role.User }];

  const chatImpl = async (attempt: number): Promise<Message> => {
    try {
      const responseItr: AbortableAsyncIterator<ChatResponse> =
        await ollama.chat({
          messages,
          model,
          stream: true,
          think: true,
        });

      let lastMessage: Message = { content: '', role: Role.Assistant };
      for await (const { message } of responseItr) {
        lastMessage = message;
        onChunk(message.content);
      }

      messages.push(lastMessage);

      return lastMessage;
    } catch (err: unknown) {
      messages.push({
        content: `The Ollama \`chat\` API threw an error: ${mapToString(err)}.`,
        role: Role.System,
      });

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
  throw new Error('No prompt provided.');
}

await chat(Model.Qwen3_14b, prompt, {
  onChunk(chunk: string): void {
    globalThis.console.log(chunk);
  },
});
