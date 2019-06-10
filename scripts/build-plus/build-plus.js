const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const BUILD_DIR = './build/';
const BUILD_INDEX = `${BUILD_DIR}index.html`;
const BUILD_PAGES = path.join(process.cwd(), './src/build-plus.js');
const NOOP = () => {};
const SOURCE_INDEX = './public/index.html';

require('@babel/register')({
  presets: [ '@babel/preset-env' ],
});
require.extensions['.gif'] = NOOP;
require.extensions['.jpeg'] = NOOP;
require.extensions['.jpg'] = NOOP;
require.extensions['.png'] = NOOP;
require.extensions['.svg'] = NOOP;


const replaceVars = (html, vars) => {
  let newHtml = html;
  for (const [ property, value ] of Object.entries(vars)) {
    newHtml = newHtml.replace(new RegExp(`\{\{ page\.${property} \}\}`, 'g'), value);
  }
  return newHtml;
};

// If the build contains Front Matter,
const indexSrc = fs.readFileSync(SOURCE_INDEX).toString();
if (/^\-\-\-\r?\n/.test(indexSrc)) {

  // Strip Front Matter from build.
  const frontMatter = indexSrc.match(/^\-\-\-\r?\n(.+?)\r?\n\-\-\-\r?\n/s);
  const indexVars = yaml.safeLoad(frontMatter[1]);

  // Rebuild index.html
  const buildHtml =
    (html => html.substring(html.indexOf('---<!') + 3))(
      fs.readFileSync(BUILD_INDEX).toString()
    );
  fs.writeFileSync(BUILD_INDEX, replaceVars(buildHtml, indexVars));

  if (fs.existsSync(BUILD_PAGES)) {
    const buildPages = require(BUILD_PAGES).default;
    for (const [ file, pageVars ] of Object.entries(buildPages.pages)) {
      const PAGE_DIR = `${BUILD_DIR}/${file}`;
      if (!fs.existsSync(PAGE_DIR)) {
        fs.mkdirSync(PAGE_DIR);
      }
      fs.writeFileSync(
        `${BUILD_DIR}/${file}/index.html`,
        replaceVars(buildHtml, {
          ...indexVars,
          ...pageVars,
        }),
      );
    }
  }
}
