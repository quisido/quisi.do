/// <reference types="cypress" />
import VIEWPORTS from '../constants/viewports';
import describeViewport from './describe-viewport';

export default function describeViewports(fn: VoidFunction): void {
  for (const [width, height] of VIEWPORTS) {
    describeViewport(width, height, fn);
  }
}
