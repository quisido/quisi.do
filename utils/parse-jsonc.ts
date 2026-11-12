import { parse, type ParseError, printParseErrorCode } from 'jsonc-parser';

export default function parseJsonc(value: string): unknown {
  const errs: ParseError[] = [];
  const result: unknown = parse(value, errs, {
    allowEmptyContent: false,
    allowTrailingComma: true,
    disallowComments: false,
  });

  if (errs.length === 0) {
    return result;
  }

  const toString = ({ error, length, offset }: ParseError): string => {
    const id: string = value.substring(offset, offset + length);
    return `${printParseErrorCode(error)}: ${id} at ${offset}`;
  };

  throw new Error(
    `An error occurred while parsing JSON with comments:\n${errs.map(toString).join('\n')}`,
    { cause: value },
  );
}
