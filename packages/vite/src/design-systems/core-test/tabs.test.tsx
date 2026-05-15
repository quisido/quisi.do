import { userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Tabs } = await importTestedDesignSystem();

const getControlledPanel = (tab: HTMLElement): HTMLElement => {
  const panelId: string | null = tab.getAttribute('aria-controls');

  if (panelId === null) {
    throw new Error('Expected tab to reference a controlled tabpanel.');
  }

  const panel: HTMLElement | null = window.document.getElementById(panelId);

  if (panel === null) {
    throw new Error('Expected aria-controls to reference an existing panel.');
  }

  return panel;
};

describe('Tabs', (): void => {
  it('should expose a named horizontal tablist of tabs', (): void => {
    const { getByName, getRoleCount } = render(
      <Tabs
        label="Project sections"
        tabs={[
          {
            active: true,
            key: 'overview',
            label: 'Overview',
            panel: 'Summary',
          },
          { active: false, key: 'settings', label: 'Settings', panel: 'Prefs' },
        ]}
      />,
    );

    const tabList: HTMLElement = getByName('tablist', 'Project sections');
    const overview: HTMLElement = getByName('tab', 'Overview');
    const settings: HTMLElement = getByName('tab', 'Settings');

    expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');
    expect(tabList).toContainElement(overview);
    expect(tabList).toContainElement(settings);
    expect(getRoleCount('tablist')).toBe(1);
    expect(getRoleCount('tab')).toBe(2);
  });

  it('should support an external visible tablist label', (): void => {
    const { getByName } = render(
      <>
        <span id="tabs-label">Account panels</span>
        <Tabs
          labelledBy="tabs-label"
          tabs={[
            {
              active: true,
              key: 'profile',
              label: 'Profile',
              panel: 'Details',
            },
          ]}
        />
      </>,
    );

    expect(getByName('tablist', 'Account panels')).toHaveAttribute(
      'aria-labelledby',
      'tabs-label',
    );
  });

  it('should associate each tab with its tabpanel', (): void => {
    const { getByName } = render(
      <Tabs
        label="Documentation"
        tabs={[
          {
            active: true,
            key: 'install',
            label: 'Install',
            panel: 'Install commands',
          },
          { active: false, key: 'usage', label: 'Usage', panel: 'Usage notes' },
        ]}
      />,
    );

    const install: HTMLElement = getByName('tab', 'Install');
    const usage: HTMLElement = getByName('tab', 'Usage');
    const installPanel: HTMLElement = getByName('tabpanel', 'Install');
    const usagePanel: HTMLElement = getControlledPanel(usage);

    expect(install).toHaveAttribute('aria-selected', 'true');
    expect(install).toHaveAttribute('tabindex', '0');
    expect(installPanel.id).toBe(install.getAttribute('aria-controls'));
    expect(installPanel).toHaveAttribute('aria-labelledby', install.id);
    expect(installPanel).not.toHaveAttribute('hidden');

    expect(usage).toHaveAttribute('aria-selected', 'false');
    expect(usage).toHaveAttribute('tabindex', '-1');
    expect(usagePanel).toHaveAttribute('aria-labelledby', usage.id);
    expect(usagePanel).toHaveAttribute('hidden');
  });

  it('should initialize from the active tab and hide inactive tabpanels', (): void => {
    const { getByName } = render(
      <Tabs
        label="Reports"
        tabs={[
          {
            active: false,
            key: 'drafts',
            label: 'Drafts',
            panel: 'Draft list',
          },
          { active: true, key: 'sent', label: 'Sent', panel: 'Sent list' },
          { active: false, key: 'archived', label: 'Archived', panel: 'Files' },
        ]}
      />,
    );

    const drafts: HTMLElement = getByName('tab', 'Drafts');
    const sent: HTMLElement = getByName('tab', 'Sent');
    const archived: HTMLElement = getByName('tab', 'Archived');

    expect(drafts).toHaveAttribute('aria-selected', 'false');
    expect(getControlledPanel(drafts)).toHaveAttribute('hidden');
    expect(sent).toHaveAttribute('aria-selected', 'true');
    expect(getByName('tabpanel', 'Sent')).toBeVisible();
    expect(archived).toHaveAttribute('aria-selected', 'false');
    expect(getControlledPanel(archived)).toHaveAttribute('hidden');
  });

  it('should activate a tab when clicked', async (): Promise<void> => {
    const { click, getByName } = render(
      <Tabs
        label="Settings"
        tabs={[
          { active: true, key: 'profile', label: 'Profile', panel: 'Identity' },
          {
            active: false,
            key: 'billing',
            label: 'Billing',
            panel: 'Invoices',
          },
        ]}
      />,
    );

    const profile: HTMLElement = getByName('tab', 'Profile');
    const billing: HTMLElement = getByName('tab', 'Billing');

    await click(billing);

    expect(profile).toHaveAttribute('aria-selected', 'false');
    expect(getControlledPanel(profile)).toHaveAttribute('hidden');
    expect(billing).toHaveFocus();
    expect(billing).toHaveAttribute('aria-selected', 'true');
    expect(getByName('tabpanel', 'Billing')).toBeVisible();
  });

  it('should move focus from the tablist to the active tabpanel in the tab sequence', async (): Promise<void> => {
    const { getByName, tab } = render(
      <>
        <button type="button">Before</button>
        <Tabs
          label="Focusable panels"
          tabs={[
            {
              active: false,
              key: 'alpha',
              label: 'Alpha',
              panel: 'First panel',
            },
            { active: true, key: 'beta', label: 'Beta', panel: 'Second panel' },
          ]}
        />
        <button type="button">After</button>
      </>,
    );

    getByName('button', 'Before').focus();
    expect(getByName('button', 'Before')).toHaveFocus();
    await tab();
    expect(getByName('tab', 'Beta')).toHaveFocus();
    await tab();
    expect(getByName('tabpanel', 'Beta')).toHaveFocus();
    await tab();
    expect(getByName('button', 'After')).toHaveFocus();
  });

  it('should activate horizontal tabs with arrow, home, and end keys', async (): Promise<void> => {
    const { getByName } = render(
      <Tabs
        label="Horizontal tabs"
        tabs={[
          { active: true, key: 'first', label: 'First', panel: 'First panel' },
          {
            active: false,
            key: 'second',
            label: 'Second',
            panel: 'Second panel',
          },
          { active: false, key: 'third', label: 'Third', panel: 'Third panel' },
        ]}
      />,
    );

    const first: HTMLElement = getByName('tab', 'First');
    const second: HTMLElement = getByName('tab', 'Second');
    const third: HTMLElement = getByName('tab', 'Third');

    first.focus();
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(second).toHaveFocus();
    expect(second).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowRight}');
    expect(third).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(third).toHaveFocus();
    await userEvent.keyboard('{Home}');
    expect(first).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(third).toHaveFocus();
    expect(getByName('tabpanel', 'Third')).toBeVisible();
  });

  it('should leave up and down arrows to the browser for horizontal tabs', async (): Promise<void> => {
    const { getByName } = render(
      <Tabs
        label="Scrolling page tabs"
        tabs={[
          { active: true, key: 'one', label: 'One', panel: 'One panel' },
          { active: false, key: 'two', label: 'Two', panel: 'Two panel' },
        ]}
      />,
    );

    const one: HTMLElement = getByName('tab', 'One');
    const two: HTMLElement = getByName('tab', 'Two');

    one.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(one).toHaveFocus();
    expect(one).toHaveAttribute('aria-selected', 'true');
    expect(two).toHaveAttribute('aria-selected', 'false');
  });

  it('should activate focused tabs with enter and space', async (): Promise<void> => {
    const { enter, getByName, space } = render(
      <Tabs
        label="Manual activation"
        tabs={[
          { active: true, key: 'read', label: 'Read', panel: 'Read panel' },
          { active: false, key: 'write', label: 'Write', panel: 'Write panel' },
        ]}
      />,
    );

    const read: HTMLElement = getByName('tab', 'Read');
    const write: HTMLElement = getByName('tab', 'Write');

    write.focus();
    await enter();
    expect(write).toHaveAttribute('aria-selected', 'true');
    expect(getByName('tabpanel', 'Write')).toBeVisible();

    read.focus();
    await space();
    expect(read).toHaveAttribute('aria-selected', 'true');
    expect(getByName('tabpanel', 'Read')).toBeVisible();
  });

  it('should activate vertical tabs with up and down arrows', async (): Promise<void> => {
    const { getByName } = render(
      <Tabs
        label="Vertical tabs"
        orientation="vertical"
        tabs={[
          { active: true, key: 'north', label: 'North', panel: 'North panel' },
          { active: false, key: 'east', label: 'East', panel: 'East panel' },
          { active: false, key: 'south', label: 'South', panel: 'South panel' },
        ]}
      />,
    );

    const tabList: HTMLElement = getByName('tablist', 'Vertical tabs');
    const north: HTMLElement = getByName('tab', 'North');
    const east: HTMLElement = getByName('tab', 'East');
    const south: HTMLElement = getByName('tab', 'South');

    expect(tabList).toHaveAttribute('aria-orientation', 'vertical');
    north.focus();
    expect(north).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(east).toHaveFocus();
    expect(east).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowUp}');
    expect(north).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    expect(south).toHaveFocus();
    expect(getByName('tabpanel', 'South')).toBeVisible();
  });
});
