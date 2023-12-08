import Card from '@salesforce/design-system-react/components/card';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import type DesignSystemProps from '../../types/design-system-props';

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
      return (
        <Demo type="Button">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props.children}
        </Demo>
      );
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
    case 'container':
      return (
        <Card
          empty={false}
          footer={props.footer}
          headerActions={props.actions}
          heading={props.header}
        >
          {JSON.stringify({
            ...props,
            actions: undefined,
            children: undefined,
            footer: undefined,
            header: undefined,
            subheader: undefined,
          })}
          <br />
          Subheader: {props.subheader}
          <br />
          {props.children}
        </Card>
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
      return (
        <a
          aria-label={props.label}
          className={props.className}
          href={props.href}
          title={props.title}
          onClick={() => {
            console.log(`track: ${props.feature}`);
          }}
        >
          {props.children}
        </a>
      );
    case 'loading-icon':
      return (
        <Demo type="LoadingIcon">
          {JSON.stringify({ ...props, children: undefined })}
          <br />
          Children: {props.children}
        </Demo>
      );
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
      return <>{props.children}</>;
  }
}
