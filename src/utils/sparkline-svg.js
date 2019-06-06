const SIZE = 1000;

export default class Sparkline {

  constructor(values = []) {
    this.desc = 'A line graph representation of a value\'s change over time.';
    this.height = '100%';
    this.preserveAspectRatio = 'none';
    this.stroke = 'currentColor';
    this.title = 'Sparkline';
    this.values = values;
    this.width = '100%';
  }

  get d() {
    let l = [];
    const max = Math.max(...this.values);
    const length = this.values.length;
    for (let i = 0; i < length; i++) {
      l.push(
        (Math.round(i / length * SIZE * 100) / 100) + ',' +
        (Math.round((SIZE - (this.values[i] / max * SIZE)) * 100) / 100),
      );
    }
    return `M ${l.join(' L ')}`;
  }

  get dataUri() {
    return `data:image/svg+xml;base64,${btoa(this.outerHTML)}`;
  }

  get outerHTML() {
    return `<?xml version="1.0" encoding="utf-8"?>
      <svg
        height="${this.height}"
        preserveAspectRatio="${this.preserveAspectRatio}"
        version="1.1"
        viewBox="0 0 ${SIZE} ${SIZE}"
        x="0px"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        y="0px"
        width="${this.width}"
      >
        <title>${this.title}</title>
        <desc>${this.desc}</desc>
        ${this.path}
      </svg>
    `;
  }

  get path() {
    if (this.values.length === 0) {
      return '';
    }
    return `
      <path
        d="${this.d}"
        fill="transparent"
        ${this.stroke ? `stroke="${this.stroke}"` : ''}
        strokeWidth="1"
      />
    `;
  }

  get style() {
    return `
      height: ${this.height};
      stroke: ${this.stroke};
      width: ${this.width};
    `;
  }

  setDescription(desc) {
    this.description = desc;
  }

  setHeight(height) {
    this.height = height;
  }

  setPreserveAspectRatio(preserveAspectRatio) {
    this.preserveAspectRatio = preserveAspectRatio;
  }

  setStroke(stroke) {
    this.stroke = stroke;
  }

  setTitle(title) {
    this.title = title;
  }

  setWidth(width) {
    this.width = width;
  }

  setValues(values) {
    this.values = values;
  }
}
