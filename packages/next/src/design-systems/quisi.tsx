import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import type DesignSystemProps from '../types/design-system-props.js';
import Banner from './quisi/banner.js';
import Button from './quisi/button.js';
import Div from './quisi/div.js';
import Header from './quisi/header.js';
import Link from './quisi/link.js';
import Section from './quisi/section.js';
import Theme from './quisi/theme.js';

function Demo({
  children,
  type,
}: PropsWithChildren<{ type: string }>): ReactElement {
  return (
    <div
      style={{
        borderLeft: '6px solid #404040',
        marginLeft: 12,
        marginTop: 24,
        paddingLeft: 12,
        paddingTop: 24,
      }}
    >
      <strong>{type}</strong>
      <br />
      {children}
    </div>
  );
}

export default function Quisido<Card extends object, Row extends object>({
  props,
  type,
}: Readonly<DesignSystemProps<Card, Row>>): ReactNode {
  switch (type) {
    case 'banner':
      return <Banner {...props} />;

    case 'button':
      return <Button {...props} />;

    case 'cards':
      return (
        <Demo type="Cards">
          {JSON.stringify({ ...props, header: undefined })}
          <br />
          Header: {props.header}
        </Demo>
      );

    case 'checkbox':
      return (
        <Demo type="Checkbox">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props.children}
        </Demo>
      );

    case 'chip':
      return (
        <Demo type="Chip">
          {JSON.stringify({ ...props, children: undefined, title: undefined })}
          <br />
          Title: {props.title}
          <br />
          Children: {props.children}
        </Demo>
      );

    case 'div':
      return <Div {...props} />;

    case 'header':
      return <Header {...props} />;

    case 'input':
      return <Demo type="Input">{JSON.stringify({ ...props })}</Demo>;

    case 'link':
      return <Link {...props} />;

    case 'loading-icon':
      return (
        <Demo type="LoadingIcon">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props['children']}
        </Demo>
      );

    case 'section':
      return <Section {...props} />;

    case 'select':
      return (
        <Demo type="Select">
          {JSON.stringify({ ...props, label: undefined })}
          <br />
          Label: {props.label}
        </Demo>
      );

    case 'span':
      return (
        <Demo type="Span">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props.children}
        </Demo>
      );

    case 'table':
      return (
        <Demo type="Table">
          {JSON.stringify({
            ...props,
            header: undefined,
            subheader: undefined,
          })}
          <br />
          Header: {props.header}
          <br />
          Subheader: {props.subheader}
        </Demo>
      );

    case 'theme':
      return <Theme>{props.children}</Theme>;
  }
}
