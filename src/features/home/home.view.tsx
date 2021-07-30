import Box from '@awsui/components-react/box';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import ViewResumeButton from '../../components/view-resume-button';
import PROJECTS from '../../constants/projects';
import avatar from '../../images/charles-stover.jpg';
import mapComponentToPropMapper from '../../map/map-component-to-prop-mapper';
import useHome from './home.hook';
import styles from './home.module.scss';
import mapProjectToAttributes from './home.util.map-project-to-attributes';
import ProjectListItem from './home.view.project-list-item';

const CURRENT_YEAR: number = new Date().getFullYear();
const ENTERPRISE_START_YEAR = 2016;
const FRONT_END_START_YEAR = 2001;
const FULL_STACK_START_YEAR = 2005;
const mapProjectToListItem = mapComponentToPropMapper(ProjectListItem);

const ENTERPRISE_YOE: number = CURRENT_YEAR - ENTERPRISE_START_YEAR;
const FRONT_END_YOE: number = CURRENT_YEAR - FRONT_END_START_YEAR;
const FULL_STACK_YOE: number = CURRENT_YEAR - FULL_STACK_START_YEAR;

export default function Home(): ReactElement {
  const { avatarAlt } = useHome();

  return (
    <AppLayout toolsHide>
      <SpaceBetween size="l">
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
                <strong>staff-level front end engineer</strong> with an
                expertise in <strong>JavaScript and React</strong>. I gravitate
                towards long-term product visions, impact across teams,
                operational health, application monitoring, and{' '}
                <abbr title="user interface">UI</abbr>/
                <abbr title="user experience">UX</abbr>.
              </Box>
              <ul className={styles.list}>
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
            </SpaceBetween>
          </SpaceBetween>
        </Container>

        <Container
          header={
            <Header>
              <I18n>Projects</I18n>
            </Header>
          }
        >
          <ul className={styles.projectList}>
            {PROJECTS.map(mapProjectToAttributes).map(mapProjectToListItem)}
          </ul>
        </Container>
      </SpaceBetween>
    </AppLayout>
  );
}
