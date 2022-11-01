import '@cloudscape-design/global-styles/index.css';
import mapStyleSheetListToCloudscapeGlobalStyleElement from '../utils/map-style-sheet-list-to-cloudscape-global-style-element';
import StyleSheetElementManager from '../utils/style-sheet-element-manager';

const CLOUDSCAPE_GLOBAL_STYLES: StyleSheetElementManager =
  new StyleSheetElementManager(mapStyleSheetListToCloudscapeGlobalStyleElement);

export default CLOUDSCAPE_GLOBAL_STYLES;
