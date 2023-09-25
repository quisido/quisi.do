import { anonymize, identify, init, shutdown } from '@fullstory/browser';
import type FullStoryAPI from '../types/fullstory-api.js';

export default {
  anonymize,
  identify,
  init,
  shutdown,
} satisfies FullStoryAPI;
