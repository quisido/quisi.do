'use client';

import { AwsRum } from 'aws-rum-web';
import type { ReactElement, ReactNode, RefObject } from 'react';
import { useMemo, useRef } from 'react';
import AwsRumContext from '../../contexts/aws-rum.js';
import mapRefToFunction from '../../utils/map-ref-to-function.js';
import noop from '../../utils/noop.js';

interface Props {
  readonly addPlugin?: AwsRum['addPlugin'] | undefined;
  readonly addSessionAttributes?: AwsRum['addSessionAttributes'] | undefined;
  readonly allowCookies?: AwsRum['allowCookies'] | undefined;
  readonly children: ReactNode;
  readonly disable?: AwsRum['disable'] | undefined;
  readonly dispatch?: AwsRum['dispatch'] | undefined;
  readonly dispatchBeacon?: AwsRum['dispatchBeacon'] | undefined;
  readonly enable?: AwsRum['enable'] | undefined;
  readonly recordError?: AwsRum['recordError'] | undefined;
  readonly recordEvent?: AwsRum['recordEvent'] | undefined;
  readonly recordPageView?: AwsRum['recordPageView'] | undefined;
  readonly registerDomEvents?: AwsRum['registerDomEvents'] | undefined;
  readonly setAwsCredentials?: AwsRum['setAwsCredentials'] | undefined;
}

export default function MockAwsRumProvider({
  addPlugin = noop,
  addSessionAttributes = noop,
  allowCookies = noop,
  children,
  disable = noop,
  dispatch = noop,
  dispatchBeacon = noop,
  enable = noop,
  recordError = noop,
  recordEvent = noop,
  recordPageView = noop,
  registerDomEvents = noop,
  setAwsCredentials = noop,
}: Props): ReactElement {
  const addPluginRef: RefObject<AwsRum['addPlugin']> = useRef(addPlugin);
  const disableRef: RefObject<AwsRum['disable']> = useRef(disable);
  const dispatchRef: RefObject<AwsRum['dispatch']> = useRef(dispatch);
  const enableRef: RefObject<AwsRum['enable']> = useRef(enable);

  const addSessionAttributesRef: RefObject<
    AwsRum['addSessionAttributes']
  > = useRef(addSessionAttributes);

  const allowCookiesRef: RefObject<AwsRum['allowCookies']> =
    useRef(allowCookies);

  const dispatchBeaconRef: RefObject<AwsRum['dispatchBeacon']> =
    useRef(dispatchBeacon);

  const registerDomEventsRef: RefObject<AwsRum['registerDomEvents']> =
    useRef(registerDomEvents);

  const recordErrorRef: RefObject<AwsRum['recordError']> =
    useRef(recordError);

  const recordEventRef: RefObject<AwsRum['recordEvent']> =
    useRef(recordEvent);

  const recordPageViewRef: RefObject<AwsRum['recordPageView']> =
    useRef(recordPageView);

  const setAwsCredentialsRef: RefObject<AwsRum['setAwsCredentials']> =
    useRef(setAwsCredentials);

  addPluginRef.current = addPlugin;
  addSessionAttributesRef.current = addSessionAttributes;
  allowCookiesRef.current = allowCookies;
  disableRef.current = disable;
  dispatchBeaconRef.current = dispatchBeacon;
  dispatchRef.current = dispatch;
  enableRef.current = enable;
  recordErrorRef.current = recordError;
  recordEventRef.current = recordEvent;
  recordPageViewRef.current = recordPageView;
  registerDomEventsRef.current = registerDomEvents;
  setAwsCredentialsRef.current = setAwsCredentials;

  const client: AwsRum = useMemo((): AwsRum => {
    const newClient: Pick<AwsRum, keyof AwsRum> = {
      addSessionAttributes: mapRefToFunction(addSessionAttributesRef),
      addPlugin: mapRefToFunction(addPluginRef),
      allowCookies: mapRefToFunction(allowCookiesRef),
      disable: mapRefToFunction(disableRef),
      dispatch: mapRefToFunction(dispatchRef),
      dispatchBeacon: mapRefToFunction(dispatchBeaconRef),
      enable: mapRefToFunction(enableRef),
      recordError: mapRefToFunction(recordErrorRef),
      recordEvent: mapRefToFunction(recordEventRef),
      recordPageView: mapRefToFunction(recordPageViewRef),
      registerDomEvents: mapRefToFunction(registerDomEventsRef),
      setAwsCredentials: mapRefToFunction(setAwsCredentialsRef),
    };

    // `newClient instanceof AwsRum`
    Object.setPrototypeOf(newClient, AwsRum.prototype);

    // eslint-disable-next-line  @typescript-eslint/consistent-type-assertions
    return newClient as AwsRum;
  }, []);

  return (
    <AwsRumContext.Provider value={client}>{children}</AwsRumContext.Provider>
  );
}
