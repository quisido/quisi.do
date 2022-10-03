import '@awsui/global-styles/index.css';
import mapStyleSheetListToAwsuiGlobalStyleElement from '../utils/map-style-sheet-list-to-awsui-global-style-element';
import StyleSheetElementManager from '../utils/style-sheet-element-manager';

const AWSUI_GLOBAL_STYLES: StyleSheetElementManager =
  new StyleSheetElementManager(mapStyleSheetListToAwsuiGlobalStyleElement);

export default AWSUI_GLOBAL_STYLES;
