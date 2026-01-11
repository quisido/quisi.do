import HTMLFormatter from '@hint/formatter-html';
import type { Problem } from '@hint/utils-types';
import type { FormatterOptions } from 'hint';

export default class PatchedHTMLFormatter extends HTMLFormatter.default {
  override format(
    problems: Problem[],
    options: FormatterOptions = {},
  ): ReturnType<HTMLFormatter.default['format']> {
    return super.format(problems, {
      ...options,
      output: options.output ?? '.tests/webhint',
    });
  }
}
