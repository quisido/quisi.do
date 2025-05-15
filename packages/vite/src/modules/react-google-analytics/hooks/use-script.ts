import { useEffect } from 'react';
import mapTrackingIdToScriptElement from '../utils/map-tracking-id-to-script-element.js';

export default function useScript(trackingId: string): void {
  useEffect((): VoidFunction => {
    const script: HTMLScriptElement = mapTrackingIdToScriptElement(trackingId);
    window.document.head.appendChild(script);
    return (): void => {
      window.document.head.removeChild(script);
    };
  }, [trackingId]);
}
