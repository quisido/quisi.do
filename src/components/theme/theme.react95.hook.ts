import { useLayoutEffect } from 'react';
import getReact95IconsStyleElement from './utils/get-react95-icons-style-element';
import mapElementToParentNode from './utils/map-element-to-parent-node';

const iconsStyleElement: Element | ProcessingInstruction =
  getReact95IconsStyleElement();

const iconsStyleParent: ParentNode = mapElementToParentNode(iconsStyleElement);

iconsStyleParent.removeChild(iconsStyleElement);

export default function useReact95Theme(): void {
  useLayoutEffect((): VoidFunction => {
    iconsStyleParent.appendChild(iconsStyleElement);
    return (): void => {
      iconsStyleParent.removeChild(iconsStyleElement);
    };
  }, []);
}
