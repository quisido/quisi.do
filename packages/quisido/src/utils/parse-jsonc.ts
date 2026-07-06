import { parse, type ParseError } from 'jsonc-parser';

const toString = ({ error, length, offset }: ParseError): string =>
  `JSONC error (code ${error}) from character ${offset} to ${offset + length}`;

export default function parseJsonC(str: string): unknown {
  const errs: ParseError[] = [];
  const result: unknown = parse(str, errs, {
    allowTrailingComma: true,
    disallowComments: false,
  });

  if (errs.length > 0) {
    throw new Error(`Failed to parse JSONC:\n${errs.map(toString).join('\n')}`);
  }

  return result;
}
