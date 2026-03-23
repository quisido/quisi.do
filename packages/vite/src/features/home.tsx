import { type ReactElement } from 'react';
import Dashboard from './dashboard.jsx';
import { Paragraph, Region } from '../design-systems/template/index.js';

export default function Home(): ReactElement {
  return (
    <>
      <Region label="About">
        <Paragraph>
          quisi.do is an invite-only, software-as-a-service provider for front
          end platforms.
        </Paragraph>
      </Region>
      <Dashboard />
    </>
  );
}
