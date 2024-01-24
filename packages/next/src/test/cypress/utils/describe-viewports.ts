/// <reference types="cypress" />
import VIEWPORTS from '../constants/viewports.js';
import describeViewport from './describe-viewport.js';

export default function describeViewports(fn: VoidFunction): void {
  for (const [width, height] of VIEWPORTS) {
    describeViewport(width, height, fn);
  }
}
