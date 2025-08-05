'use client';

import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent';
import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { BrowserAgentContext } from './browser-agent-context.jsx';

interface Props {
  readonly applicationID: string;
  readonly licenseKey: string;
}

export default function NewRelic({
  applicationID,
  children,
  licenseKey,
}: PropsWithChildren<Props>): ReactElement {
  const [browserAgent] = useState(
    (): BrowserAgent =>
      new BrowserAgent({
        info: {
          applicationID,
          licenseKey,
        },

        init: {
          ajax: {
            // Domains to exclude
            deny_list: [],
          },

          api: {
            allow_registered_children: true,
          },

          distributed_tracing: {
            allowed_origins: [],
            cors_use_newrelic_header: false,
            cors_use_tracecontext_headers: false,
            enabled: true,
            exclude_newrelic_header: false,
          },

          page_action: {
            enabled: true,
          },

          performance: {
            capture_detail: true,
            capture_marks: true,
            capture_measures: true,
            resources: {
              enabled: true,
              first_party_domains: [
                'a.quisi.do',
                'dashboard.quisi.do',
                'localhost',
                'quisi.do',
              ],
            },
          },

          privacy: {
            cookies_enabled: true,
          },

          session_replay: {
            enabled: true,
            fix_stylesheets: true,
            mask_all_inputs: true,
            preload: true,
          },

          user_actions: {
            elementAttributes: ['aria-label', 'name', 'role', 'title', 'type'],
            enabled: true,
          },
        },
      }),
  );

  useEffect((): VoidFunction => {
    browserAgent.start();
    browserAgent.recordReplay();

    return (): void => {
      browserAgent.pauseReplay();
      browserAgent.finished(Date.now());
    };
  }, [browserAgent]);

  return (
    <BrowserAgentContext.Provider value={browserAgent}>
      {children}
    </BrowserAgentContext.Provider>
  );
}
