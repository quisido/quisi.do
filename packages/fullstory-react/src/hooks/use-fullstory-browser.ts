'use client';

import * as fullStoryBrowser from '@fullstory/browser';
import { useContext } from 'react';
import FullStoryBrowser from '../contexts/fullstory-browser.js';

export default function useFullStoryBrowser(): typeof fullStoryBrowser {
  return useContext(FullStoryBrowser) ?? fullStoryBrowser;
}
