import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import type DesignSystemProps from '../../types/design-system-props.js';
import Button from './components/button.js';
import Link from './components/link.js';
import Section from './components/section.js';
import Theme from './components/theme.js';

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
      return (
        <Demo type="Banner">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props.children}
        </Demo>
      );

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
      return (
        <Demo type="Div">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props.children}
        </Demo>
      );

    case 'header':
      return (
        <Demo type="Header">
          {JSON.stringify({
            ...props,
            children: undefined,
            actions: undefined,
          })}
          <br />
          Actions: {props.actions}
          <br />
          Children: {props.children}
        </Demo>
      );

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
