/**
 * `middleware.ts` should redirect all root pages to `./[locale]/`.
 */

export default function RootPage(): never {
  throw new Error('Expected the root page to be inaccessible.');
}
