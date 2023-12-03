import { type NextConfig } from "next";

export default function mapNodeEnvToOnDemandEntries(
  env: 'development' | 'production' | 'test',
): NextConfig['onDemandEntries'] {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  return {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 1024,
  };
}
