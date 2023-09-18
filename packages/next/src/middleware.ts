import type { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import isLocalePath from './utils/is-locale-path';

const RESERVED_FILES: ReadonlySet<string> = new Set([
  // '/',
  // '/_error',
  '/apple-icon.png',
  '/favicon.ico',
  '/hhRmW9PFLyiXjXY8JBcs1U.nex',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
]);

export const middleware: NextMiddleware = ({
  nextUrl,
  url: requestUrl,
}: Readonly<NextRequest>): NextMiddlewareResult => {
  const { pathname: nextUrlPathname } = nextUrl;

  // NextJS internals
  if (nextUrlPathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // Reserved files
  if (RESERVED_FILES.has(nextUrlPathname)) {
    return NextResponse.next();
  }

  // Redirect away from English locales in URLs.
  if (nextUrlPathname.startsWith('/en-US/')) {
    const newUrl: URL = new URL(
      nextUrlPathname.substring('/en-US'.length),
      requestUrl,
    );
    return NextResponse.redirect(newUrl);
  }

  // Rewrite missing locales to English.
  if (!isLocalePath(nextUrlPathname)) {
    const newPathname = `/en-US${nextUrlPathname}`;
    const newUrl: URL = new URL(newPathname, requestUrl);
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
};
