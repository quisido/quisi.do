/// <reference types="bun-types" />
import type { Subprocess } from 'bun';
import { join } from 'node:path';
import cloneTemplate from './clone-template.js';
import { type Component, COMPONENTS } from './components.js';
import { type Model, MODEL_OPTIONS } from './models.js';

interface Options {
  readonly description: string;
  readonly designSystemsDir: string;
  readonly model: Model;
  readonly screenshotPath?: string | undefined;
  readonly slug: string;
}

const WRITE_DIRECTORIES: readonly string[] = [
  join(import.meta.dir, '..', '..', '..', '..', 'node_modules', '.vite'),
  join(import.meta.dir, '..', '..', '..', '..', 'node_modules', '.vite-temp'),
  join(import.meta.dir, '..', '..', '.cache'),
  join(import.meta.dir, '..', '..', '.tests'),
  join(import.meta.dir, '..', '..', 'node_modules', '.vite'),
  join(import.meta.dir, '..', '..', 'node_modules', '.vite-temp'),
];

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

  const promptTemplate: string = await Bun.file(
    join(import.meta.dir, 'PROMPT.md'),
  ).text();

  let begin = false;
  const toSubprocess = async ({
    descriptionFile: componentDescriptionFile,
    slug: componentSlug,
  }: Component): Promise<void> => {
    if (componentSlug === 'link') {
      begin = true;
    }
    if (!begin) {
      return;
    }

    const componentDescriptionPath: string = join(
      designSystemsDir,
      componentDescriptionFile,
    );

    // Replaces a relative [link](./path/) with an absolute [link](/to/path/).
    const toAbsoluteLink = (_: string, name: string, path: string): string =>
      `[${name}](${join(componentDescriptionPath, path)})`;

    const componentDescription: string = (
      await Bun.file(componentDescriptionPath).text()
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
        (await Bun.file(componentScreenshotPath).exists())
          ? `
Use the design system's description to **replace** the placeholder example
screenshot located at \`${componentScreenshotPath}\` with an artistic variation.
Implement the JSX and SCSS to match the image variant.
`
          : '',
      );

    // eslint-disable-next-line no-console
    console.log(`---------- Generating component: ${componentSlug} ----------`);

    const execution: Subprocess<'pipe', 'pipe', 'pipe'> = Bun.spawn(
      [
        ...command({
          workingDirectory: designSystemDir,
          writeDirectories: WRITE_DIRECTORIES,
        }),
      ],
      { stderr: 'pipe', stdin: 'pipe', stdout: 'pipe' },
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
        await Bun.write(Bun.stdout, text.slice(1));
      } else {
        await Bun.write(Bun.stdout, text);
      }

      newLine = text.endsWith('\n');
    }

    const exitCode: number = await execution.exited;
    await Bun.write(Bun.stdout, '\n');
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
