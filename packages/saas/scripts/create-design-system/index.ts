import { type Subprocess } from 'bun';
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

export default async function createDesignSystem({
  description: designSystemDescription,
  designSystemsDir,
  model,
  screenshotPath: designSystemScreenshotPath,
  slug: designSystemSlug,
}: Options): Promise<void> {
  const { command, parallel } = MODEL_OPTIONS[model];

  const designSystemDir: string = await cloneTemplate({
    dir: designSystemsDir,
    slug: designSystemSlug,
  });

  const promptTemplate: string = await Bun.file(
    await Bun.resolve('PROMPT.md', import.meta.dir),
  ).text();

  const toSubprocess = async ({
    descriptionFile: componentDescriptionFile,
    slug: componentSlug,
  }: Component): Promise<void> => {
    const componentDescriptionPath: string = await Bun.resolve(
      componentDescriptionFile,
      designSystemsDir,
    );

    // Replaces a relative [link](./path/) with an absolute [link](/to/path/).
    const toAbsoluteLink = (_: string, name: string, path: string): string =>
      `[${name}](${Bun.resolveSync(path, componentDescriptionPath)})`;

    const componentDescription: string = (
      await Bun.file(componentDescriptionPath).text()
    ).replaceAll(/\[(?<name>[^\]]+)\]\((?<path>[^)]+)\)/gu, toAbsoluteLink);

    const componentScreenshotPath: string = await Bun.resolve(
      `${componentSlug}.png`,
      designSystemDir,
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

    const execution: Subprocess<'inherit', 'inherit', 'pipe'> = Bun.spawn(
      [...command({ directory: designSystemDir, prompt })],
      { stderr: 'pipe', stdin: 'inherit', stdout: 'inherit' },
    );

    const exitCode: number = await execution.exited;
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
