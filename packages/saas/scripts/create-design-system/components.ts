export interface Component {
  readonly instructions: string;
  readonly slug: string;
}

export const COMPONENTS: Component[] = [
  { instructions: '', slug: 'alert' },
  { instructions: '', slug: 'button' },
  { instructions: '', slug: 'checkbox' },
  { instructions: '', slug: 'menu' },
  { instructions: '', slug: 'subscript' },
  { instructions: '', slug: 'suggestion' },
  { instructions: '', slug: 'superscript' },
];
