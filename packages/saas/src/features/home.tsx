import { type ReactElement } from 'react';

import { Main, Marquee, Region } from '../components/design-system.js';
import Page from './page.js';

const QUOTES = [
  'quisi.do will not be televised.',
  'quisi.do will not be brought to you by Xerox in four parts without commercial interruption.',
  'quisi.do will not show you pictures of Nixon blowing a bugle and leading a charge by John Mitchell, General Abrams and Spiro Agnew to eat hog maws confiscated from a Harlem sanctuary.',
  'quisi.do will not be brought to you by the Schaeffer Award Theatre and will not star Natalie Woods and Steve McQueen or Bullwinkle and Julia.',
  'quisi.do will not give your mouth sex appeal.',
  'quisi.do will not get rid of the nubs.',
  'quisi.do will not make you look five pounds thinner, because quisi.do will not be televised.',
  'quisi.do will not be right back after a message about a white tornado, white lightning, or white people.',
  'quisi.do will not go better with Coke.',
  'quisi.do will not fight germs that may cause bad breath.',
  "quisi.do will put you in the driver's seat.",
  'quisi.do will be no re-run.',
  'quisi.do will be live.',
] as const;

export default function Home(): ReactElement {
  const quote: string | undefined =
    QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <Page>
      <Main>
        <Region heading="About">
          <Marquee>{quote}</Marquee>
        </Region>
      </Main>
    </Page>
  );
}
