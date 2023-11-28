type RecordKeyOf<T> = T extends Record<infer U, unknown> ? U : never;

type TokenColorKeys<T extends readonly TokenColors[]> =
  T[number]['scope'] extends string
    ? `${T[number]['scope']}.${RecordKeyOf<T[number]['settings']>}`
    : `${T[number]['scope'][number]}.${RecordKeyOf<T[number]['settings']>}`;

type FlatTokenColors<T extends VSCodeColorTheme> =
  T['tokenColors'] extends readonly TokenColors[]
    ? Readonly<Record<TokenColorKeys<T['tokenColors']>, string>>
    : Readonly<Record<string, never>>;

type FlatVSCodeColorTheme<T extends VSCodeColorTheme> = T['colors'] &
  T['semanticTokenColors'] &
  FlatTokenColors<T>;

interface TokenColors {
  // readonly name?: string;
  readonly scope: string | readonly string[];
  readonly settings: Partial<Readonly<Record<string, string>>>;
}

interface VSCodeColorTheme {
  // readonly $schema: string; // 'vscode://schemas/color-theme'
  readonly colors?: Readonly<Record<string, string>>;
  // readonly name: string;
  readonly semanticTokenColors?: Readonly<Record<string, string>>;
  readonly tokenColors?: readonly TokenColors[];
}

const EMPTY_OBJECT: Readonly<Record<string, never>> = {};

const mapObjectToEntries = <T extends Record<string, unknown>>(
  obj: Partial<T>,
): [keyof T, T[keyof T]][] => Object.entries(obj) as [keyof T, T[keyof T]][];

const mapTokenColorsToRecord = <T extends VSCodeColorTheme>(
  { scope, settings }: TokenColors, // Required<T>['tokenColors'][number]
): FlatTokenColors<T> => {
  const record: FlatTokenColors<T> = Object.assign(EMPTY_OBJECT, {});
  if (typeof scope === 'string') {
    const reduceEntriesToRecord = (
      settingsRecord: FlatTokenColors<T>,
      [key, value]: readonly [string, string],
    ): FlatTokenColors<T> => ({
      ...settingsRecord,
      [key]: value,
    });
    return mapObjectToEntries(settings).reduce<FlatTokenColors<T>>(
      reduceEntriesToRecord,
      EMPTY_OBJECT,
    );
  }
  // for (const tokenColors){}
  return record;
};

const reduceTokenColorsToRecord = <T extends VSCodeColorTheme>(
  record: FlatTokenColors<T>,
  tokenColors: TokenColors,
): FlatTokenColors<T> => ({
  ...record,
  ...mapTokenColorsToRecord<T>(tokenColors),
});

const flattenTokenColors = <T extends VSCodeColorTheme>(
  tokenColors: T['tokenColors'],
): FlatTokenColors<T> => {
  if (typeof tokenColors === 'undefined') {
    return EMPTY_OBJECT;
  }

  return tokenColors.reduce<FlatTokenColors<T>>(
    reduceTokenColorsToRecord,
    EMPTY_OBJECT,
  );
};

export default function flattenVSCodeColorTheme<T extends VSCodeColorTheme>({
  colors,
  semanticTokenColors,
  tokenColors,
}: T): FlatVSCodeColorTheme<T> {
  const flatTokenColors: FlatTokenColors<T> = flattenTokenColors(tokenColors);
  return {
    ...colors,
    ...flatTokenColors,
    ...semanticTokenColors,
  };
}
