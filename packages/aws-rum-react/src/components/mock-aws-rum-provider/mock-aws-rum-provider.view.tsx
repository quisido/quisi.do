import { AwsRum } from 'aws-rum-web';
import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import AwsRumContext from '../../contexts/aws-rum';
import mapRefToFunction from '../../utils/map-ref-to-function';
import noop from '../../utils/noop';

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
  const addPluginRef: MutableRefObject<AwsRum['addPlugin']> = useRef(addPlugin);
  const addSessionAttributesRef: MutableRefObject<
    AwsRum['addSessionAttributes']
  > = useRef(addSessionAttributes);
  const allowCookiesRef: MutableRefObject<AwsRum['allowCookies']> =
    useRef(allowCookies);
  const disableRef: MutableRefObject<AwsRum['disable']> = useRef(disable);
  const dispatchBeaconRef: MutableRefObject<AwsRum['dispatchBeacon']> =
    useRef(dispatchBeacon);
  const dispatchRef: MutableRefObject<AwsRum['dispatch']> = useRef(dispatch);
  const enableRef: MutableRefObject<AwsRum['enable']> = useRef(enable);
  const registerDomEventsRef: MutableRefObject<AwsRum['registerDomEvents']> =
    useRef(registerDomEvents);
  const recordErrorRef: MutableRefObject<AwsRum['recordError']> =
    useRef(recordError);
  const recordEventRef: MutableRefObject<AwsRum['recordEvent']> =
    useRef(recordEvent);
  const recordPageViewRef: MutableRefObject<AwsRum['recordPageView']> =
    useRef(recordPageView);
  const setAwsCredentialsRef: MutableRefObject<AwsRum['setAwsCredentials']> =
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
    return newClient as AwsRum;
  }, []);

  return (
    <AwsRumContext.Provider value={client}>{children}</AwsRumContext.Provider>
  );
}
