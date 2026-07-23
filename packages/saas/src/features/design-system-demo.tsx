import { type ReactElement, useState } from 'react';
import {
  AlertDialog,
  Article,
  BlockQuote,
  Button,
  Checkbox,
  Code,
  Main,
  Paragraph,
  Region,
} from '../design-systems/template/index.js';
import Page from './page.js';

export default function DesignSystemDemo(): ReactElement {
  const [checked, setChecked] = useState(false);
  const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);

  return (
    <Page>
      <Main>
        {isAlertDialogVisible && (
          <AlertDialog
            heading="Alert dialog"
            onDismiss={(): void => {
              setIsAlertDialogVisible(false);
            }}
          >
            This is the content.
          </AlertDialog>
        )}
        <Region heading="Design System Demo">
          <Paragraph>This is a region.</Paragraph>
          <Article heading="Article">This article is in the region.</Article>
          <BlockQuote>This quote is from the article.</BlockQuote>
        </Region>
        <Region heading="Second region">
          <Paragraph>This is another region.</Paragraph>
          <Code>console.log('Hello, world!');</Code>
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
        <Region heading="Controls">
          <Paragraph>
            <Button
              onClick={(): void => {
                setIsAlertDialogVisible(true);
              }}
            >
              Show alert dialog
            </Button>
          </Paragraph>
        </Region>
      </Main>
    </Page>
  );
}
