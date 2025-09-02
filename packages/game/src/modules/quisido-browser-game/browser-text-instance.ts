import { type TextInstance } from '../quisido-game/index.js';

export default class BrowserTextInstance implements TextInstance {
  #hidden = false;
  #text: string;

  public constructor(text: string) {
    this.#text = text;
  }

  public get hidden(): boolean {
    return this.#hidden;
  }

  public hide(): void {
    this.#hidden = true;
  }

  public reset(): void {
    this.#text = '';
  }

  public get text(): string {
    return this.#text;
  }

  public unhide(text: string): void {
    this.#hidden = false;
    this.#text = text;
  }

  public update(_oldText: string, newText: string): void {
    this.#text = newText;
  }
}
