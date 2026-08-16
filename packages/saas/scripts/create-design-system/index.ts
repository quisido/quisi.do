import cloneTemplate from './clone-template.js';
import { type Component, COMPONENTS } from './components.js';
import type { ModelOptions } from './models.js';

interface Options {
  readonly description: string;
  readonly modelOptions: ModelOptions;
  readonly screenshotPath?: string | undefined;
  readonly slug: string;
}

export default async function createDesignSystem({
  description: designSystemDescription,
  modelOptions: { parallel },
  screenshotPath,
  slug: designSystemSlug,
}: Options): Promise<void> {
  await cloneTemplate(designSystemSlug);

  const toSubprocess = async ({
    instructions,
    slug: componentSlug,
  }: Component): Promise<void> => {
    const prompt = `Create a design system named "${designSystemSlug}".

    Description: ${designSystemDescription}

    Component slug: ${componentSlug}
    Component instructions: ${instructions}

    Screenshot: ${screenshotPath}`;

    const codex: Bun.Subprocess<'inherit', 'inherit', 'pipe'> = Bun.spawn(
      ['codex', 'exec', '--ephemeral', prompt],
      { stderr: 'pipe', stdin: 'inherit', stdout: 'inherit' },
    );

    const exitCode: number = await codex.exited;
    if (exitCode === 0) {
      return;
    }

    const stdErr: string = await new Response(codex.stderr).text();
    throw new Error(
      `[Error #${exitCode}] Failed to generate component: ${componentSlug}\n${stdErr}`,
    );
  };

  if (parallel) {
    await Promise.all(COMPONENTS.map(toSubprocess));
  } else {
    for (const component of COMPONENTS) {
      /**
       * We await in a loop here, because it was explicitly decided by the
       * `parallel` flag. When working with third-party model providers,
       * sequential generation can prevent throttling and token waste if a fatal
       * error occurs.
       */
      // eslint-disable-next-line no-await-in-loop
      await toSubprocess(component);
    }
  }
}
