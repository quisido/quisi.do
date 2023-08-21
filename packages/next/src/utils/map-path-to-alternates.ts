interface Alternates {
  readonly canonical: string;
  readonly languages: Record<
    'ar-EG' | 'en-US' | 'es-ES' | 'fil-PH' | 'x-default',
    string
  >;
}

export default function mapPathToAlternates(path: string): Alternates {
  return {
    canonical: `https://charlesstover.com${path}`,
    languages: {
      'ar-EG': `https://charlesstover.com/ar-EG${path}`,
      'en-US': `https://charlesstover.com${path}`,
      'es-ES': `https://charlesstover.com/es-ES${path}`,
      'fil-PH': `https://charlesstover.com/fil-PH${path}`,
      'x-default': `https://charlesstover.com${path}`,
    },
  };
}
