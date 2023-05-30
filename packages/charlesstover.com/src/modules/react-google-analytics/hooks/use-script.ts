import { useEffect } from 'react';
import HEAD from '../constants/head';
import mapTrackingIdToScriptElement from '../utils/map-tracking-id-to-script-element';

export default function useScript(trackingId: string): void {
  useEffect((): VoidFunction => {
    const script: HTMLScriptElement = mapTrackingIdToScriptElement(trackingId);
    HEAD.appendChild(script);
    return (): void => {
      HEAD.removeChild(script);
    };
  }, [trackingId]);
}
