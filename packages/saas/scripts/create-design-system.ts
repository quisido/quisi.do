/// <reference types="bun-types" />
import createDesignSystem from './create-design-system/index.js';
import { isModelSlug, MODEL_OPTIONS } from './create-design-system/models.js';

const ARGV_PREFIX_LENGTH = 2;
const VALID_SLUG = /^[a-z0-9][a-z0-9-]+[a-z0-9]$/u;

const [
  modelSlug = '',
  designSystemSlug = '',
  description = '',
  screenshotPath = '',
] = Bun.argv.slice(ARGV_PREFIX_LENGTH);

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

if (!isModelSlug(modelSlug)) {
  throw new Error('Expected a valid model as the first argument.', {
    cause: modelSlug,
  });
}

await createDesignSystem({
  description,
  modelOptions: MODEL_OPTIONS[modelSlug],
  screenshotPath,
  slug: designSystemSlug,
});
