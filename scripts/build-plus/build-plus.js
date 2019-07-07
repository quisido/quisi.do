const fs = require('fs');
const path = require('path');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const BUILD_DIR = './build/';
const BUILD_INDEX = `${BUILD_DIR}index.html`;
const BUILD_PAGES = path.join(process.cwd(), './src/build-plus.js');
const NOOP = () => {};

require('@babel/register')({
  presets: [ '@babel/preset-env' ],
});
require.extensions['.gif'] = NOOP;
require.extensions['.jpeg'] = NOOP;
require.extensions['.jpg'] = NOOP;
require.extensions['.md'] = NOOP;
require.extensions['.png'] = NOOP;
require.extensions['.svg'] = NOOP;

const replaceMetadata = (html, metadata) => {
  let newHtml = html;
  if (metadata.description) {
    newHtml = newHtml.replace(
      /<meta name="description" content=".+?" \/>/,
      `<meta name="description" content="${metadata.description}" />`,
    );
  }
  if (metadata.keywords) {
    newHtml = newHtml.replace(
      /<meta name="keywords" content=".+?" \/>/,
      `<meta name="keywords" content="${metadata.description}" />`,
    );
  }
  if (metadata.title) {
    newHtml = newHtml.replace(
      /<title>.+?<\/title>/,
      `<title>${metadata.title}</title>`,
    );
  }
  return newHtml;
};

const buildHtml = fs.readFileSync(BUILD_INDEX).toString();

if (fs.existsSync(BUILD_PAGES)) {
  const buildPages = require(BUILD_PAGES).default;
  for (const [ file, pageVars ] of Object.entries(buildPages.pages)) {
    const PAGE_DIR = `${BUILD_DIR}/${file}`;
    if (!fs.existsSync(PAGE_DIR)) {
      fs.mkdirSync(PAGE_DIR);
    }
    fs.writeFileSync(
      `${BUILD_DIR}/${file}/index.html`,
      replaceMetadata(buildHtml, pageVars),
    );
  }
}
