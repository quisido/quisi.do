import mapEnumToFilter from '../../../utils/map-enum-to-filter';
import Sort from '../constants/publications-sort';

const filterByPublicationsSort = mapEnumToFilter(Sort);

export default filterByPublicationsSort;
