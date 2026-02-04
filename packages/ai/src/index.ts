/// <reference types="bun-types" />
import ollama, { type Message } from 'ollama';

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

export default async function chat(prompt: string): Promise<Message> {
  const chatImpl = async (attempt: number): Promise<Message> => {
    try {
      const response = await ollama.chat({
        messages: [
          {
            content: prompt,
            role: Role.User,
          },
        ],
        model: Model.Qwen3_14b,
      });

      return response.message;
    } catch (_err: unknown) {
      return chatImpl(attempt + 1);
    }
  };
  return chatImpl(1);
}

const [, , prompt] = process.argv;
if (prompt === undefined) {
  throw new Error('No prompt provided.');
}

const response: Message = await chat(prompt);

globalThis.console.log(response.content);
