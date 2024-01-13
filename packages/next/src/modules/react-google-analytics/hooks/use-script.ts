'use client';

import { useEffect } from 'react';
import getHead from '../utils/get-head.js';
import mapTrackingIdToScriptElement from '../utils/map-tracking-id-to-script-element.js';

export default function useScript(trackingId: string): void {
  useEffect((): VoidFunction => {
    const head: HTMLHeadElement = getHead();
    const script: HTMLScriptElement = mapTrackingIdToScriptElement(trackingId);
    head.appendChild(script);
    return (): void => {
      head.removeChild(script);
    };
  }, [trackingId]);
}
