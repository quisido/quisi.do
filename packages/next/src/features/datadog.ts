'use client';

import useDatadog from 'react-datadog';
import GITHUB_SHA from '../constants/github-sha.js';

const EXPERIMENTAL_FEATURES: string[] = ['feature_flags'];

export default function Datadog(): null {
  useDatadog({
    applicationId: 'e29eb164-e193-4380-b512-ebd70bbfaeb6',
    clientToken: 'pubf0c07bd5003d0c4a65a9f129d9e83a3d',
    enableExperimentalFeatures: EXPERIMENTAL_FEATURES,
    env: process.env.NODE_ENV,
    service: 'quisi.do',
    sessionReplayRecording: true,
    version: GITHUB_SHA ?? 'unknown',
  });

  return null;
}
