/// <reference types="bun-types" />
import { join } from 'node:path';
import createDesignSystem from './create-design-system/index.js';
import { isModel } from './create-design-system/models.js';

const ARGV_PREFIX_LENGTH = 2;
const RELATIVE_DESIGN_SYSTEMS_DIR = '../src/design-systems';
const VALID_SLUG = /^[a-z0-9][a-z0-9-]+[a-z0-9]$/u;

const [model = '', designSystemSlug = '', description = '', screenshotPath] =
  Bun.argv.slice(ARGV_PREFIX_LENGTH);

if (!VALID_SLUG.test(designSystemSlug)) {
  throw new Error(
    'Expected a valid design system slug as the first argument.',
    { cause: designSystemSlug },
  );
}

if (description.trim().length === 0) {
  throw new Error(
    'Expected a design system description as the second argument.',
    { cause: description },
  );
}

if (!isModel(model)) {
  throw new Error('Expected a valid model as the first argument.', {
    cause: model,
  });
}

await createDesignSystem({
  description,
  designSystemsDir: join(import.meta.dir, RELATIVE_DESIGN_SYSTEMS_DIR),
  model,
  screenshotPath,
  slug: designSystemSlug,
});
