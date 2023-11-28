import isFileHref from './is-file-href';
import isHrefExternal from './is-href-external';

export default function isHrefBlank(href: string | undefined): boolean {
  return isHrefExternal(href) || isFileHref(href);
}
