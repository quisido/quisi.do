'use client';

import * as fullStoryBrowser from '@fullstory/browser';
import { useContext } from 'react';
import FullStorySdk from '../contexts/fullstory-sdk.js';
import type { FullStorySdk as FullStorySdkType } from '../types/fullstory-sdk.js';

export default function useFullStorySdk(): FullStorySdkType {
  return useContext(FullStorySdk) ?? fullStoryBrowser;
}
