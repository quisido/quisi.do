'use client';

import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Container from '../../components/container';
import Div from '../../components/div';
import validateString from '../../utils/validate-string';
import ViewResumeButton from './components/view-resume-button';
import useHome from './home.hook';
import styles from './home.module.scss';
import Link from '../../components/link';

const aboutClassName: string = validateString(styles.about);
const contentClassName: string = validateString(styles.content);
const CURRENT_YEAR: number = new Date().getFullYear();
const ENTERPRISE_START_YEAR = 2016;
const FRONT_END_START_YEAR = 2001;
const FULL_STACK_START_YEAR = 2005;
const listClassName: string = validateString(styles.list);
const ENTERPRISE_YOE: number = CURRENT_YEAR - ENTERPRISE_START_YEAR;
const FRONT_END_YOE: number = CURRENT_YEAR - FRONT_END_START_YEAR;
const FULL_STACK_YOE: number = CURRENT_YEAR - FULL_STACK_START_YEAR;

export default function Home(): ReactElement {
  const { avatarAlt } = useHome();

  return (
    <>
      <Container actions={<ViewResumeButton />} header={<I18n>About</I18n>}>
        <Div className={contentClassName} display="flex" flexDirection="row">
          <Div className={aboutClassName} display="flex" flexDirection="column">
            <Div element="p" marginBottom="medium">
              <strong>Quisido</strong> is a front end engineer leading a{' '}
              <abbr title="software as a service">SaaS</abbr> charity
              initiative. The <strong>quisi.do</strong> website contains a
              collection of open-source software, the profits of which are
              forwarded to{' '}
              {/* <Link
                category="features/home"
                href="/charities/"
                title="quisi.do's supported charities"
              > */}
              501(c)(3) charities {/* </Link>{' '} */}
              with completely{' '}
              <Link
                category="features/home"
                href="/dashboard"
                title="quisi.do operational dashboard"
              >
                transparent operations
              </Link>
              .
            </Div>
            <section>
              <ul className={listClassName}>
                <li>
                  <I18n n={ENTERPRISE_YOE}>Enterprise: $n years</I18n>
                </li>
                <li>
                  <I18n n={FRONT_END_YOE}>Front end: $n years</I18n>
                </li>
                <li>
                  <I18n n={FULL_STACK_YOE}>Full stack: $n years</I18n>
                </li>
              </ul>
            </section>
          </Div>
        </Div>
      </Container>
    </>
  );
}
