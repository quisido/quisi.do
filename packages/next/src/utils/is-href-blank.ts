import isFileHref from './is-file-href.js';
import isHrefExternal from './is-href-external.js';

export default function isHrefBlank(href: string | undefined): boolean {
  return isHrefExternal(href) || isFileHref(href);
}
