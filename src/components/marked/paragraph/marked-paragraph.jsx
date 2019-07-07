import React from 'react';

export default function MarkedParagraph({ children }) {
  return <p dangerouslySetInnerHTML={{
    __html: children,
  }} />;
}
