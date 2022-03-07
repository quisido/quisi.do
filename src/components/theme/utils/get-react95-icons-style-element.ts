import '@react95/icons/icons.css';
import mapStyleSheetListToReact95IconsStyleSheetElement from '../utils/map-style-sheet-list-to-react95-icons-style-element';

export default function getReact95IconsStyleElement():
  | Element
  | ProcessingInstruction {
  return mapStyleSheetListToReact95IconsStyleSheetElement(document.styleSheets);
}
