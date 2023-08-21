import '@cloudscape-design/global-styles/index.css';
import StyleSheetElementManager from '../../../../../utils/style-sheet-element-manager';
import mapStyleSheetListToGlobalStyleElement from '../utils/map-style-sheet-list-to-global-style-element';

const CLOUDSCAPE_GLOBAL_STYLES: StyleSheetElementManager =
  new StyleSheetElementManager(mapStyleSheetListToGlobalStyleElement);

export default CLOUDSCAPE_GLOBAL_STYLES;
