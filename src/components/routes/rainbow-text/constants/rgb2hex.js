const hex = '0123456789ABCDEF';

const n2hex = n =>
  hex[Math.floor(n / 16)] +
  hex[n % 16];

const rgb2hex = (r, g, b) =>
  '#' + n2hex(r) + n2hex(g) + n2hex(b);

export default rgb2hex;
