import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Container from '@awsui/components-react/container';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import { ReactElement } from 'react';
import AppLayout from '../../components/app-layout';
import styles from './home.module.scss';
import avatar from './images/avatar.jpg';

const CURRENT_YEAR: number = new Date().getFullYear();

export default function Home(): ReactElement {
  return (
    <AppLayout toolsHide>
      <SpaceBetween size="m">
        <Container
          header={
            <Header
              actions={
                <Button
                  href="/resume/2019-11/charles-stover-resume.pdf"
                  iconAlign="right"
                  iconAlt="external"
                  iconName="external"
                  target="_blank"
                  variant="primary"
                >
                  View resum&eacute;
                </Button>
              }
            >
              About me
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
                alt="Avatar"
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
                <li>Front end: {CURRENT_YEAR - 2001} years</li>
                <li>Full stack: {CURRENT_YEAR - 2005} years</li>
              </ul>
            </SpaceBetween>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </AppLayout>
  );
}
