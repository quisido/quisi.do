import { useLayoutEffect } from 'react';
import getAwsuiGlobalStyleElement from './utils/get-awsui-global-style-element';
import mapElementToParentNode from './utils/map-element-to-parent-node';

const globalStyleElement: Element | ProcessingInstruction =
  getAwsuiGlobalStyleElement();

const globalStyleParent: ParentNode =
  mapElementToParentNode(globalStyleElement);

globalStyleParent.removeChild(globalStyleElement);

export default function useThemeGlobalStyles(): void {
  useLayoutEffect((): VoidFunction => {
    globalStyleParent.appendChild(globalStyleElement);
    return (): void => {
      globalStyleParent.removeChild(globalStyleElement);
    };
  }, []);
}
