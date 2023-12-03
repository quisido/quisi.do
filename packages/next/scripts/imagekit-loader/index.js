import sign from './sign.js';

const NONE = 0;

export default function imageKit({ quality, src, width }) {
  // if (process.env.NODE_ENV === 'development') {
  //   return src;
  // }

  const tr = [];

  if (typeof quality === 'number') {
    tr.push(`q-${quality}`);
  }

  if (typeof width === 'number') {
    tr.push(`w-${width}`);
  }

  if (tr.length === NONE) {
    return src;
  }

  const id = `tr:${tr.join(',')}${src}`;
  const signature = sign(id);
  return `https://ik.imagekit.io/quisido/${id}?ik-s=${signature}`;
}
