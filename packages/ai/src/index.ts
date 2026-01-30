/// <reference types="node" />
import ollama from 'ollama';

enum Model {
  DeepSeek_R1_14b = 'deepseek-r1:14b',
  Qwen3_14b = 'qwen3:14b',
}

export default async function runAI(): Promise<string> {
  const response = await ollama.chat({
    messages: [{ content: 'Why did my VRAM overflow?', role: 'user' }],
    model: Model.Qwen3_14b,
  });

  return response.message.content;
}

const response: string = await runAI();

// eslint-disable-next-line no-console
console.log(response);
