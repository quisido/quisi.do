interface Alternates {
  readonly canonical: string;
  readonly languages: Record<
    'ar-EG' | 'en-US' | 'es-ES' | 'fil-PH' | 'x-default',
    string
  >;
}

export default function mapPathToAlternates(path: string): Alternates {
  return {
    canonical: `https://quisi.do${path}`,
    languages: {
      'ar-EG': `https://quisi.do/ar-EG${path}`,
      'en-US': `https://quisi.do${path}`,
      'es-ES': `https://quisi.do/es-ES${path}`,
      'fil-PH': `https://quisi.do/fil-PH${path}`,
      'x-default': `https://quisi.do${path}`,
    },
  };
}
