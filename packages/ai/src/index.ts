import parseRequest from './parse-request.js';
import runAiTask from './run-ai-task.js';
import type Task from './task.js';
import VitestTask from './vitest-task.js';

interface Env {
  readonly ACCESS_TOKEN: string;
  readonly AI: Ai;
  readonly SENTRY_AUTH_TOKEN: string;
}

const handler: ExportedHandler<Env> = {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 401 Unauthorized
    const authHeader: string = request.headers.get('Authorization') ?? '';
    if (authHeader !== `Bearer ${env.ACCESS_TOKEN}`) {
      return new Response('Unauthorized: Invalid access token', {
        status: 401,
      });
    }

    // 405 Method Not Allowed
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { vitest } = await parseRequest(request);

    const tasks: Task[] = [];
    if (typeof vitest !== 'undefined') {
      tasks.push(new VitestTask(vitest));
    }

    if (tasks.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid test report provided' }),
        { status: 400 },
      );
    }

    const mapTaskToRun = (task: Task): Promise<string> =>
      runAiTask(env.AI, task);

    try {
      const taskResults: PromiseSettledResult<string>[] =
        await Promise.allSettled(tasks.map(mapTaskToRun));

      return new Response(
        taskResults
          // ESLint is wrong here when switch-case has no fallthrough.
          // eslint-disable-next-line array-callback-return
          .map((result: PromiseSettledResult<string>): string => {
            switch (result.status) {
              case 'fulfilled': {
                return result.value;
              }

              case 'rejected': {
                return JSON.stringify({
                  error: (result.reason as Error).message,
                });
              }
            }
          })
          .join('\n'),
        { status: 200 },
      );
    } catch (err: unknown) {
      return new Response(JSON.stringify({ error: (err as Error).message }), {
        status: 500,
      });
    }
  },
};

export default handler;
