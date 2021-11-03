import '@awsui/global-styles/index.css';
import mapStyleSheetListToAwsuiGlobalStyleElement from '../utils/map-style-sheet-list-to-awsui-global-style-element';

export default function getAwsuiGlobalStyleElement():
  | Element
  | ProcessingInstruction {
  return mapStyleSheetListToAwsuiGlobalStyleElement(document.styleSheets);
}
