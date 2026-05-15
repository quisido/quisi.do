import type { ReadStream } from 'node:tty';

/**
 * We actually pass `NodeJS.ReadStream` to this function; but as long as it's
 * type-safe, we can use the more generic `ReadStream` type.
 */
export default function getKey(stdin: ReadStream): Promise<string> {
  return new Promise((resolve: (value: string) => void): void => {
    stdin.setRawMode(true);
    stdin.once('data', (data: Buffer<ArrayBuffer>): void => {
      stdin.setRawMode(false);
      stdin.unref();
      resolve(data.toString('utf8'));
    });
  });
}
