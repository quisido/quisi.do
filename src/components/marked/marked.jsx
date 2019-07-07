import React from 'react';
import Blockquote from './blockquote';
import Heading from './heading';
import List from './list';
import ListItem from './list-item';
import Paragraph from './paragraph';

const Components = {
  blockquote: Blockquote,
  heading: Heading,
  list: List,
  list_item: ListItem,
  paragraph: Paragraph,
};

export default function Marked({ text, type, ...props }) {
  if (type === 'space') {
    return ' ';
  }
  if (type === 'text') {
    return <span dangerouslySetInnerHTML={{
      __html: text,
    }} />;
  }
  if (!Object.prototype.hasOwnProperty.call(Components, type)) {
    throw new Error(`Missing markdown type "${type}"`);
  }
  const Component = Components[type];
  return <Component {...props}>{text}</Component>;
}
