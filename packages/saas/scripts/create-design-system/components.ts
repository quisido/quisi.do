export interface Component {
  readonly descriptionFile: string;
  readonly instructions: string;
  readonly slug: string;
}

const canvas = (slug: string): Component => ({
  descriptionFile: `core/${slug}.md`,
  instructions:
    'This element represents the canvas. Instead of a visual enclosure (border), use a subtle decorative accent and/or the Gestalt principle of proximity (negative space) to segregate it from other content.',
  slug,
});

const floating = (
  slug: string,
  instructions?: string | undefined,
): Component => ({
  descriptionFile: `core/${slug}.md`,
  instructions: `This element is floating. Visually enclose it.${
    instructions ? ` ${instructions}` : ''
  }`,
  slug,
});

const ink = (slug: string): Component => ({
  descriptionFile: `core/${slug}.md`,
  instructions:
    'This element represents the ink on the canvas, not the canvas itself. Do not visually separate it from its container (e.g. with a border). Instead, style the foreground, negative space, and _subtle_ decorative accents.',
  slug,
});

const widget = (slug: string): Component => ({
  descriptionFile: `core/${slug}.md`,
  instructions: 'This element represents a widget. Visually enclose it.',
  slug,
});

export const COMPONENTS: Component[] = [
  floating('alert'),
  floating(
    'alert-dialog',
    'This element should be floating in the middle of the screen; it should not cover the entire screen. Obscure the content outside of the modal.',
  ),
  canvas('application'),
  canvas('article'),
  {
    descriptionFile: 'core/banner.md',
    instructions:
      'This element represents the canvas. Style it as a bookend that anchors the top of the experience.',
    slug: 'banner',
  },
  {
    descriptionFile: 'core/block-quote.md',
    instructions:
      'This element represents the ink on the canvas, not the canvas itself. As a pull-quote, it should have a subtle background tint or a strong left border, but it should not look like an interactive card.',
    slug: 'block-quote',
  },
  widget('button'),
  widget('checkbox'),
  {
    descriptionFile: 'core/code.md',
    instructions:
      'This element represents the ink on the canvas, not the canvas itself. Use a subtle background tint, a thin border, and/or an organic `clip-path` background to signal a shift from human prose to programmatic logic.',
    slug: 'code',
  },
  widget('combobox'),
  ink('comment'),
  canvas('complementary'),
  {
    descriptionFile: 'core/content-info.md',
    instructions:
      'This element represents the canvas. Style it as a bookend that anchors the bottom of the experience.',
    slug: 'content-info',
  },
  ink('definition'),
  floating(
    'dialog',
    'This element should be floating in the middle of the screen; it should not cover the entire screen. Obscure the content outside of the modal.',
  ),
  canvas('document'),
  ink('emphasis'),
  canvas('feed'),
  ink('figure'),
  {
    descriptionFile: 'core/form.md',
    instructions:
      'This element represents the canvas. Instead of a visual enclosure (border), use a subtle background to group the form elements and distinguish the task area from the general reading content.',
    slug: 'form',
  },
  canvas('grid'),
  ink('heading'),
  ink('image'),
  widget('link'),
  ink('list'),
  canvas('list-box'),
  ink('log'),
  canvas('main'),
  ink('mark'),
  floating('marquee'),
  {
    descriptionFile: 'core/math.md',
    instructions:
      'This element represents the ink on the canvas, not the canvas itself. Use a subtle background tint and/or a thin border to signal a shift from human prose to programmatic logic.',
    slug: 'math',
  },
  floating('menu'),
  floating('menu-bar'),
  widget('meter'),
  {
    descriptionFile: 'core/navigation.md',
    instructions:
      'This element represents the canvas. Use `backdrop-filter: blur()` or a single-side border to containerize it.',
    slug: 'navigation',
  },
  {
    descriptionFile: 'core/note.md',
    instructions:
      'This element represents the ink on the canvas, not the canvas itself. This is a "callout." Use a background color (yellow, blue, or light gray), a prominant side-border, or an organic `clip-path` background to indicate that it is a side-comment, not a part of the main narrative flow.',
    slug: 'note',
  },
  ink('paragraph'),
  widget('progress-bar'),
  canvas('radio-group'),
  canvas('region'),
  widget('scrollbar'),
  canvas('search'),
  widget('search-box'),
  {
    descriptionFile: 'core/separator.md',
    instructions: "This element's entire job is to be a visual line.",
    slug: 'separator',
  },
  {
    descriptionFile: 'core/separator-widget.md',
    instructions: "This element's entire job is to be a visual line.",
    slug: 'separator-widget',
  },
  widget('slider'),
  widget('spin-button'),
  floating('status'),
  ink('strong'),
  ink('subscript'),
  ink('suggestion'),
  ink('superscript'),
  widget('switch'),
  canvas('table'),
  {
    descriptionFile: 'core/tabs.md',
    instructions: `A tab is a widget. Visually enclose it.

The tab list represents a canvas. Instead of a visual enclosure (border), use a subtle decorative accent and/or the Gestalt principle of proximity (negative space) to segregate it from other content.

A tab panel is floating. Visually enclose it.`,
    slug: 'tabs',
  },
  ink('term'),
  widget('text-box'),
  ink('time'),
  floating('timer'),
  widget('toggle-button'),
  canvas('toolbar'),
  floating('tooltip'),
  canvas('tree'),
  canvas('tree-grid'),
];
