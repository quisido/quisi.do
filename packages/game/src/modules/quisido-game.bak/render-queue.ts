import type RenderProps from './render-props.js';

export default class RenderQueue extends Map<string, RenderProps> {
  public flush(): MapIterator<[string, RenderProps]> {
    const entries: MapIterator<[string, RenderProps]> = this.entries();
    this.clear();
    return entries;
  }
}
