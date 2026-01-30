import JSONFormatter from '@hint/formatter-json';
import type { Problem } from '@hint/utils-types';
import type { FormatterOptions } from 'hint';

export default class PatchedJSONFormatter extends JSONFormatter.default {
  override format(
    problems: Problem[],
    options: FormatterOptions = {},
  ): Promise<void> {
    return super.format(problems, {
      ...options,
      output: options.output ?? '.tests/webhint/output.json',
    });
  }
}
