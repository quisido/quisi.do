/// <reference types="@cloudflare/workers-types" />

export default (async function scheduled(
  { scheduledTime }: ScheduledController,
  env: unknown,
): Promise<void> {
  console.log(scheduledTime, env);
  return;
} satisfies ExportedHandlerScheduledHandler);
