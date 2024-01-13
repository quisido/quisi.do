import createError from './create-error.js';

const HTTP_UNAUTHORIZED = 401;

export default function mapRequestUrlToCode(url: string): string {
  const { searchParams } = new URL(url);
  const code: string | null = searchParams.get('code');
  if (code === null) {
    throw createError('Expected a code.', url, HTTP_UNAUTHORIZED);
  }

  return code;
}
