import { browserProfilingIntegration, init,  replayIntegration, type User } from "@sentry/browser";
import { type DataCollection,  setUser } from "@sentry/core";
import {   useEffect, useMemo } from "react";
import { type AuthenticationState, useAuthentication } from "../contexts/authentication.js";
import validateString from "../utils/validate-string.js";
import { GITHUB_SHA } from "../constants/github-sha.js";


const BROWSER_PROFILING_INTEGRATION = browserProfilingIntegration();
const ENVIRONMENT: string = validateString(import.meta.env.SENTRY_ENVIRONMENT);
const RELEASE: string = GITHUB_SHA ?? 'unknown';

const DATA_COLLECTION: DataCollection = {
  cookies: true,
  frameContextLines: 7,
  genAI: {
    inputs: true,
    outputs: true,
  },
  httpBodies: [
    'incomingRequest',
    'outgoingRequest',
    'incomingResponse',
    'outgoingResponse',
  ],
  httpHeaders: {
    request: true,
    response: true,
  },
  queryParams: true,
  stackFrameVariables: true,
  userInfo: true,
};

const IGNORE_ERRORS: RegExp[] = [
  /^Object Not Found Matching Id:\d+, MethodName:\w+, ParamCount:\d+$/u,
];

const REPLAY_INTEGRATION = replayIntegration({
  blockAllMedia: false,
  maskAllText: false,
});

const TRACE_PROPAGATION_TARGETS: string[] = [
  'api.quisi.do',
  'api.quisido.dev',
  'localhost',
  'quisi.do',
  'quisido.dev',
];

export default function useSentry(): void {
  // Contexts
  const authn: AuthenticationState = useAuthentication();


  // States
  const user = useMemo((): User | undefined => {
    if (typeof authn.data === 'undefined') {
      return;
    }

    const { id } = authn.data;
    if (id === null) {
      return;
    }

    return {
      ...authn.data,
      id,
    };
  }, [authn]);

  // Effects
  useEffect((): void => {
    init({
      attachStacktrace: true,
      dataCollection: DATA_COLLECTION,
      dsn: 'https://a36b53fdd093405eb597a945f49a70f2@o592283.ingest.sentry.io/5740642',
      enabled: true,
      environment: ENVIRONMENT,
      ignoreErrors: IGNORE_ERRORS,
      integrations: [BROWSER_PROFILING_INTEGRATION, REPLAY_INTEGRATION],
      normalizeDepth: Number.POSITIVE_INFINITY,
      release: RELEASE,
      replaysOnErrorSampleRate: 1,
      replaysSessionSampleRate: 1,
      sampleRate: 1,
      sendClientReports: true,
      tracePropagationTargets: TRACE_PROPAGATION_TARGETS,
      tracesSampleRate: 1,
    }  );
  }, []);

  useEffect((): void => {
    setUser({
      ip_address: '{{auto}}',
      ...user,
    });
  }, [user]);
}
