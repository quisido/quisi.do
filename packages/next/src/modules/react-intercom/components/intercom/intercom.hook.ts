import { useEffect, useMemo } from 'react';
import INTERCOM_WINDOW from '../../constants/intercom-window';
import type IntercomFunction from '../../types/intercom-function';
import createIntercomFunction from '../../utils/create-intercom';
import mapAppIdToScriptElement from '../../utils/map-app-id-to-script-element';
import getHead from '../../utils/get-head';

export default function useIntercom(appId: string): IntercomFunction {
  const intercom: IntercomFunction = useMemo(createIntercomFunction, []);

  useEffect((): void => {
    if (INTERCOM_WINDOW.Intercom === intercom) {
      intercom('reattach_activator');
      intercom('update', INTERCOM_WINDOW.intercomSettings);
      return;
    }

    INTERCOM_WINDOW.Intercom = intercom;
  }, [intercom]);

  useEffect((): VoidFunction => {
    const head: HTMLHeadElement = getHead();
    const script: HTMLScriptElement = mapAppIdToScriptElement(appId);
    head.appendChild(script);
    return (): void => {
      head.removeChild(script);
    };
  }, [appId]);

  return intercom;
}
