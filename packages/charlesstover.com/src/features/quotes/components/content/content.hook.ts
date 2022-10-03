import { useState } from 'react';

interface State {
  readonly bionicReadingEnabled: boolean;
  readonly onBionicReadingToggle: (value: boolean) => void;
}

export default function useQuotesContent(): State {
  const [bionicReadingEnabled, setBionicReadingEnabled] = useState(false);

  return {
    bionicReadingEnabled,
    onBionicReadingToggle: setBionicReadingEnabled,
  };
}
