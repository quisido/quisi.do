'use client';

import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Header from '../modules/quisi/header.jsx';
import Section from '../modules/quisi/section.jsx';
import validateString from '../utils/validate-string.js';
import styles from './dashboard.module.scss';
import PleasantnessDashboard from './pleasantness-dashboard.jsx';

const LIST_CLASS_NAME: string = validateString(styles['list']);

export default function Dashboard(): ReactElement {
  return (
    <Section
      header={
        <Header>
          <I18n>Dashboard</I18n>
        </Header>
      }
    >
      <ul className={LIST_CLASS_NAME}>
        {/*
        <li>
          <section>
            <h3>Efficacy</h3>
            <p>Yes.</p>
          </section>
        </li>
        */}
        <li>
          <PleasantnessDashboard />
        </li>
        <li>
          <section>
            <h3 style={{ margin: 0 }}>Scalability</h3>
            <ul>
              <li>Requests per second</li>
              <li>ROI, must be &ge; 1</li>
              <li>Availability</li>
              <li>Market funnel, $1 spent &ge; $1 earned</li>
            </ul>
          </section>
        </li>
        <li>
          <section>
            <h3 style={{ margin: 0 }}>Security</h3>
            <ul>
              <li>CSRF blocked</li>
              <li>Cloudflare DDoS + blocked IP counts</li>
              <li>AuthN/AuthZ error counts</li>
              <li>Anomaly detection on the above ratios</li>
            </ul>
          </section>
        </li>
      </ul>
    </Section>
  );
}
