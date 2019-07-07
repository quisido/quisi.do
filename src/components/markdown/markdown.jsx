import marked from 'marked';
import React from 'react';
import Marked from '../marked';
import createInlineRenderer from './inline-renderer';

const END = /_end$/;

const MARKED_OPTIONS = {
  gfm: true,
};

const START = /_start$/;

const getOpenElement = (elements, depth) => {
  let element = elements;
  for (let i = 0; i < depth; i++) {
    element = element.text[element.text.length - 1];
  }
  return element;
};

const mapTokensToMarked = (token, index) =>
  <Marked
    key={index}
    {...token}
  />;

export default function Markdown({ children, images }) {
  const elements = {
    text: [],
  };
  const inlineLexerOptions = {
    renderer: createInlineRenderer(images),
  };
  const tokens = marked.lexer(children, MARKED_OPTIONS);
  let openDepth = 0;
  for (const token of tokens) {
    const openElement = getOpenElement(elements, openDepth);
    if (START.test(token.type)) {
      openElement.text.push({
        text: [],
        ...token,
        type: token.type.replace(START, ''),
      });
      openDepth++;
    } else if (END.test(token.type)) {
      openElement.text = openElement.text.map(mapTokensToMarked);
      openDepth--;
    } else {
      if (Object.prototype.hasOwnProperty.call(token, 'text')) {
        const text = marked.inlineLexer(token.text, [], inlineLexerOptions);
        if (
          openElement.text.length > 0 &&
          openElement.text[openElement.text.length - 1].type === 'text'
        ) {
          openElement.text[openElement.text.length - 1].text += ` ${text}`;
        } else {
          openElement.text.push({ ...token, text });
        }
      } else {
        openElement.text.push(token);
      }
    }
  }
  return elements.text.map(mapTokensToMarked);
}
