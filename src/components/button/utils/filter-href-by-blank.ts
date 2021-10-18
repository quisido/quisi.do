import filterHrefByExternal from '../utils/filter-href-by-external';
import filterHrefByFile from '../utils/filter-href-by-file';

export default function filterHrefByBlank(href: string | undefined): boolean {
  return filterHrefByExternal(href) || filterHrefByFile(href);
}
