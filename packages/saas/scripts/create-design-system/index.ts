import { join } from 'node:path';

import {
  file,
  resolveSync,
  type Spawn,
  spawn,
  stdout,
  type Subprocess,
  write,
} from 'bun';
import cloneTemplate from './clone-template.js';
import { type Component, COMPONENTS } from './components.js';
import { type Model, MODEL_OPTIONS } from './models/index.js';

interface Options {
  readonly description: string;
  readonly designSystemsDir: string;
  readonly model: Model;
  readonly screenshotPath?: string | undefined;
  readonly slug: string;
}

export const isModel = (value: string): value is Model =>
  Object.hasOwn(MODEL_OPTIONS, value);

export default async function createDesignSystem({
  description: designSystemDescription,
  designSystemsDir,
  model,
  screenshotPath: designSystemScreenshotPath,
  slug: designSystemSlug,
}: Options): Promise<void> {
  const { command, format, parallel } = MODEL_OPTIONS[model];

  const designSystemDir: string = await cloneTemplate({
    dir: designSystemsDir,
    slug: designSystemSlug,
  });

  const promptTemplate: string = await file(
    join(import.meta.dir, 'PROMPT.md'),
  ).text();

  const spawnOptions: Spawn.SpawnOptions<'pipe', 'pipe', 'pipe'> = {
    cwd: designSystemDir,
    env: {
      ...process.env,
      // OpenCode uses the PWD environment variable.
      PWD: designSystemDir,
    },
    stderr: 'pipe',
    stdin: 'pipe',
    stdout: 'pipe',
  };

  /**
   * For serial (non-parallel) execution:
   * - If this component was created before the previous one, assume it's a
   *   template file: overwrite it.
   * - If this component was created after the previous one, assume this step
   *   completed during a previous crashed run: skip it.
   */
  let lastModifiedTimestamp = Number.POSITIVE_INFINITY;
  const shouldSkip = async (componentSlug: string): Promise<boolean> => {
    if (parallel) {
      return false;
    }

    const componentPath: string = join(designSystemDir, `${componentSlug}.tsx`);
    const { mtimeMs } = await file(componentPath).stat();
    try {
      return mtimeMs > lastModifiedTimestamp;
    } finally {
      lastModifiedTimestamp = mtimeMs;
    }
  };

  const toSubprocess = async ({
    descriptionFile: componentDescriptionFile,
    slug: componentSlug,
  }: Component): Promise<void> => {
    if (await shouldSkip(componentSlug)) {
      // eslint-disable-next-line no-console
      console.log(`---------- Skipping component: ${componentSlug} ----------`);
      return;
    }

    const componentDescriptionPath: string = join(
      designSystemsDir,
      componentDescriptionFile,
    );

    // Replaces a relative [link](./path/) with an absolute [link](/to/path/).
    const toAbsoluteLink = (_: string, name: string, path: string): string =>
      `[${name}](${resolveSync(path, componentDescriptionPath)})`;

    const componentDescription: string = (
      await file(componentDescriptionPath).text()
    ).replaceAll(/\[(?<name>[^\]]+)\]\((?<path>[^)]+)\)/gu, toAbsoluteLink);

    const componentScreenshotPath: string = join(
      designSystemDir,
      `${componentSlug}.png`,
    );

    const prompt: string = promptTemplate
      .replaceAll('$_COMPONENT_DESCRIPTION_$', componentDescription)
      .replaceAll('$_COMPONENT_SLUG_$', componentSlug)
      .replaceAll(
        '$_DESIGN_SYSTEM_DESCRIPTION_$',
        designSystemDescription +
          (designSystemScreenshotPath === undefined
            ? ''
            : ` The screenshot \`${designSystemScreenshotPath}\` can be used for inspiration.`),
      )
      .replaceAll('$_DESIGN_SYSTEM_DIRECTORY_$', designSystemDir)
      .replaceAll('$_DESIGN_SYSTEM_SLUG_$', designSystemSlug)
      .replaceAll(
        '$_INSTRUCTIONS_$',
        (await file(componentScreenshotPath).exists())
          ? `
Use the design system's description to **replace** the placeholder example
screenshot located at \`${componentScreenshotPath}\` with an artistic variation.
Implement the JSX and SCSS to match the image variant.
`
          : '',
      );

    // eslint-disable-next-line no-console
    console.log(`---------- Generating component: ${componentSlug} ----------`);

    const execution: Subprocess<'pipe', 'pipe', 'pipe'> = spawn(
      [...command],
      spawnOptions,
    );

    await execution.stdin.write(prompt);
    await execution.stdin.end();

    let newLine: boolean = false;
    for await (const chunk of execution.stdout) {
      const stdOut: string = new TextDecoder().decode(chunk);
      const text: string | undefined = format(stdOut);
      if (text === undefined) {
        continue;
      }

      // Skip new lines if we're already on one.
      if (newLine && text.startsWith('\n')) {
        await write(stdout, text.slice(1));
      } else {
        await write(stdout, text);
      }

      newLine = text.endsWith('\n');
    }

    const exitCode: number = await execution.exited;

    lastModifiedTimestamp = Date.now();
    await write(stdout, '\n');
    if (exitCode === 0) {
      return;
    }

    const stdErr: string = await new Response(execution.stderr).text();
    throw new Error(
      `[Code ${exitCode}] Failed to generate component: ${componentSlug}\n${stdErr}`,
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
