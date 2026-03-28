import { useState } from 'react';

export interface FeedState {
  readonly busy: boolean;
}

export default function useFeed(): FeedState {
  const [busy, setBusy] = useState(false);

  return {
    busy,
  };
}
