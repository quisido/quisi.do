import { type ReactElement, useState } from 'react';
import {
  Article,
  BlockQuote,
  Button,
  Checkbox,
  Code,
  Document,
  Heading,
  Link,
  List,
  Navigation,
  Paragraph,
  Region,
} from './template/index.js';

export default function DesignSystemDemo(): ReactElement {
  const [checked, setChecked] = useState(false);

  return (
    <Document
      banner={
        <>
          <Heading level={1}>Design System Demo</Heading>
          <Navigation label="Navigation">
            <List
              items={[{ children: <Link href="/">Home</Link>, key: 'home' }]}
            />
          </Navigation>
        </>
      }
      contentInfo="&copy; quisi.do"
    >
      <Region heading="Region">
        <Paragraph>This is a region.</Paragraph>
        <Article heading="Article">This article is in the region.</Article>
        <BlockQuote>This quote is from the article.</BlockQuote>
      </Region>
      <Region heading="Second region">
        <Paragraph>This is another region.</Paragraph>
        <Code>console.log('Hello, world!');</Code>
        <Button
          onClick={(): void => {
            // Do nothing.
          }}
        >
          Do nothing.
        </Button>
        <Checkbox
          label="Check me"
          onCheck={(): void => {
            setChecked(true);
          }}
          onUncheck={(): void => {
            setChecked(false);
          }}
          value={checked}
        />
      </Region>
    </Document>
  );
}
