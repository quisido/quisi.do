import { Renderer } from 'marked';

const CURRENT_HOSTNAME = new RegExp(`^https?://${window.location.hostname}`);
const IMAGE_PLACEHOLDER = /^#/;

const inlineRendererLink = (href, title, text) => {
  if (!href) {
    return text;
  }
  let relAttr = '';
  let targetAttr = '';
  if (!CURRENT_HOSTNAME.test(href)) {
    relAttr = ' rel="nofollow noopener noreferrer"';
    targetAttr = ' target="_blank"';
  }
  const titleAttr = title ? ` title="${title}"` : '';
  return (
    '<a' +
      ` href="${href}"` +
      relAttr +
      targetAttr +
      titleAttr +
    '>' +
      text +
    '</a>'
  );
};

const inlineRendererImage = images =>
  (href, title, text) => {
    if (href === null) {
      return text;
    }
    let src = href;
    if (IMAGE_PLACEHOLDER.test(href)) {
      const id = href.substring(1);
      if (Object.prototype.hasOwnProperty.call(images, id)) {
        src = images[id];
      }
    }
    const titleAttr = title ? ` title="${title}"` : '';
    return (
      '<img' +
        ` alt="${text}"` +
        ` src="${src}"` +
        titleAttr +
        ' width="100%"' +
      ' />'
    );
  };

export default function createInlineRenderer(images = Object.create(null)) {
  const inlineRenderer = new Renderer({
    breaks: true,
    gfm: true,
    xhtml: true,
  });
  inlineRenderer.image = inlineRendererImage(images);
  inlineRenderer.link = inlineRendererLink;
  return inlineRenderer;
}
