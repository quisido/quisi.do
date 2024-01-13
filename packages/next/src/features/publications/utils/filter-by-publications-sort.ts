import mapEnumToFilter from '../../../utils/map-enum-to-filter.js';
import Sort from '../constants/publications-sort.js';

const filterByPublicationsSort = mapEnumToFilter(Sort);

export default filterByPublicationsSort;
