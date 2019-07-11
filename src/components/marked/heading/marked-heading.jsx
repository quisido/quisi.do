import React from 'react';

export default function MarkedHeading({ children, depth }) {
  const Component = `h${depth}`;
  const id = children.toLowerCase()
    .replace(/[^a-z]+/g, '-')
    .replace(/(?:^-|-$)/g, '');
  return (
    <Component id={id}>
      <a
        aria-hidden
        href={`#${id}`}
        rel="nofollow noopener noreferrer"
        title="Link to this section."
      >
        <span
          aria-label="Link"
          role="img"
        >
          🔗
        </span>
      </a>
      {children}
    </Component>
  );
}
