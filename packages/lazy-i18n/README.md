# Lazy I18n

[![version](https://img.shields.io/npm/v/lazy-i18n.svg)](https://www.npmjs.com/package/lazy-i18n)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/lazy-i18n.svg)](https://www.npmjs.com/package/lazy-i18n)
[![downloads](https://img.shields.io/npm/dt/lazy-i18n.svg)](https://www.npmjs.com/package/lazy-i18n)

Lazy i18n is a collection of React components and hooks that support
internationalization for multiple languages by asynchronously loading key-value
pair translation files.

## Install

- `npm install lazy-i18n` or
- `yarn add lazy-i18n`

## Use

Wrap your application in the `I18nProvider` component. The `locale` prop
specifies which translations should be used. The `fallbackLocale` prop is an
optional value that specifies which translations should be used if a translation
is not present in the `locale`. The `translations` prop specifies translations
for each locale. In the following example, the `en` locale is eagerly loaded
while the `es` locale is lazily loaded.

```javascript
import { I18nProvider } from 'lazy-i18n';
import en from './path/to/en.json';

const TRANSLATIONS = {
  en, // <-- eager load
  es: () => import('./path/to/es.json'), // <-- lazy load
};

function App() {
  return (
    <I18nProvider fallbackLocale="en" locale="es" translations={TRANSLATIONS}>
      <Main />
    </I18nProvider>
  );
}
```

To use your translation files, you can import the `I18n` component, passing the
translation key as a child and translation variables as props. Translation
variables will replace instances of `$variableName` (prefixed with `$`) with the
variable's value.

```javascript
import I18n from 'lazy-i18n';

// Hello world!
function Main() {
  return <I18n user="world">Hello $user!</I18n>;
}
```

You can also import the `useTranslate` hook, where the first parameter is the
translation key and the second parameter is a record of translation variables.
This is useful when you need to translate props for a component that only
accepts strings.

```javascript
import { useTranslate } from 'lazy-i18n';

function Picture() {
  const translate = useTranslate();

  // Hello world!
  const alt = translate('Hello $user!', {
    user: 'world',
  });

  return <img alt={alt} src="hello.jpg" />;
}
```

When a lazy-loaded translation has not yet loaded, the `useTranslate` hook's
function will return `undefined`. You can use this to render placeholder text.

```javascript
import { useTranslate } from 'lazy-i18n';

function Title() {
  const translate = useTranslate();
  return <h1>{translate('My website') || '...'}</h1>;
}
```

## API

### `I18n`

The `I18n` component translates its children based on the `I18nProvider`
context. Its props represent variables in the translation string.

`<I18n var1="one" var2="two">three</I18n>` is analogous to
`translate('three', { var1: 'one', var2: 'two' })` when using the `useTranslate`
hook.

```javascript
import I18n from 'lazy-i18n';

function MyString() {
  return (
    <I18n var1="one" var2="two">
      three
    </I18n>
  );
}
```

### `I18nProvider`

`import { I18nProvider } from 'lazy-i18n';`

The `I18nProvider` component provides a React context allowing the `I18n`
components and `useTranslate` hooks to access the translations.

The `I18nProvider` component accepts the following props:

#### `fallbackLocale`

Type: _keyof `translations`_ (optional)

When present, the `I18n` component and `useTranslate` hook will first attempt to
load translations from the `locale` translations. Only if the `locale`
translations do not contain the specified translation key, the component or hook
will then load and look for the translation key in the fallback locale.

```javascript
const ES = {
  Spanish: 'Espanol',
};
const EN = {
  English: 'English',
};

// Use English, but fallback to Spanish if a property does not exist in English.
function App() {
  return (
    <I18nProvider
      fallbackLocale="es"
      locale="en"
      translations={{
        en: EN,
        es: ES,
      }}
    >
      <Spanish />
    </I18nProvider>
  );
}

// Translate the string "Spanish."
function Spanish() {
  return <I18n>Spanish</I18n>;
}
```

In the above example, since the string "Spanish" does not exist in the `en`
locale, the `es` fallback locale will be used. `<Spanish />` displays "Espanol"
to the user.

#### `LoadingComponent`

Type: `ComponentType` _optional_

The `LoadingComponent` prop specifies a component to render when using the
`<I18n>` component while the translations are still loading.

By default, this component is three animating dots.

#### `locale`

Type: _keyof `translations`_ (required)

The `locale` prop specifies the property in the `translations` prop to use for
all translations.

#### `translations`

Type: `Record<string, Translations>` (required)

The `translations` prop contains all translations for all languages. As the
`locale` prop changes, the `I18n` component and `useTranslate` hook will
re-render with the translations used in the `translations` prop for the
specified locale.

### `useTranslate`

`import { useTranslate } from 'lazy-i18n';`

The `useTranslate` hook returns a function that translates a provided key.

```javascript
function Button() {
  const translate = useTranslate();
  return <button>{translate('Submit')}</button>;
}
```

If your translation requires variables, you may pass them as the second
parameter to the `translate` function.

```javascript
function Button({ type = 'form' }) {
  const translate = useTranslate();
  return <button>{translate('Submit $type', { type })}</button>;
}

<Button type="form" />   // Submit form
<Button type="order" />  // Submit order
<Button type="resume" /> // Submit resume
```

## Types

### `Translations`

The `Translations` type provided to the `translations` prop can be an
eager-loaded or lazy-loaded `Record<string, string>`. Example valid values:

- Default exports: `import en from './en.json';`
- Dynamic imports: `const en = () => import('./en.json');`
- Module exports: `const en = require('./en.json');`
- On-demand imports: `const en = () => require('./en.json');`
