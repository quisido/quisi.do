import * as fullstoryBrowser from '@fullstory/browser';
import { useContext } from 'react';
import FullstoryBrowser from '../contexts/fullstory-browser.js';

export default function useFullstoryBrowser(): Omit<
  typeof fullstoryBrowser,
  'default'
> {
  return useContext(FullstoryBrowser) ?? fullstoryBrowser;
}
