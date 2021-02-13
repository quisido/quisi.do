import Box from '@awsui/components-react/box';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import ViewResumeButton from '../../components/view-resume-button';
import useHome from './home.hook';
import styles from './home.module.scss';
import avatar from './images/avatar.jpg';

const CURRENT_YEAR: number = new Date().getFullYear();
const FRONT_END_YOE: number = CURRENT_YEAR - 2001;
const FULL_STACK_YOE: number = CURRENT_YEAR - 2005;

export default function Home(): ReactElement {
  const { avatarAlt } = useHome();

  return (
    <AppLayout toolsHide>
      <SpaceBetween size="m">
        <Container
          header={
            <Header actions={<ViewResumeButton />}>
              <I18n>About me</I18n>
            </Header>
          }
        >
          <SpaceBetween
            className={styles.content}
            direction="horizontal"
            size="xxl"
          >
            <Box textAlign="center">
              <img
                alt={avatarAlt}
                className={styles.avatar}
                height={100}
                src={avatar}
                width={100}
              />
            </Box>
            <SpaceBetween className={styles.p} direction="vertical" size="m">
              <Box variant="p">
                My name is <strong>Charles Stover</strong>. I am a{' '}
                <strong>senior front end engineer</strong> with a focus in{' '}
                <strong>JavaScript and React</strong>. My expertise is in
                leading projects for large teams, application monitoring, and{' '}
                <abbr title="user interface">UI</abbr>/
                <abbr title="user experience">UX</abbr>.
              </Box>
              <ul className={styles.list}>
                <li>
                  <I18n n={FRONT_END_YOE}>Front end: $n years</I18n>
                </li>
                <li>
                  <I18n n={FULL_STACK_YOE}>Full stack: $n years</I18n>
                </li>
              </ul>
            </SpaceBetween>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </AppLayout>
  );
}
