import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Tabs } = await importTestedDesignSystem();

describe('TabList', (): void => {
  describe('orientation', (): void => {
    it('should default to horizontal', (): void => {
      const { getByRole } = render(<Tabs tabs={[]} />);
      const tabList: HTMLElement = getByRole('tablist');
      expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should support vertical', (): void => {
      const { getByRole } = render(<Tabs orientation="vertical" tabs={[]} />);
      const tabList: HTMLElement = getByRole('tablist');
      expect(tabList).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('tabs', (): void => {
    describe('active', (): void => {
      it('should display a panel', (): void => {
        const { getByName } = render(
          <Tabs
            tabs={[
              { active: true, key: 1, label: 'First', panel: 'Foo' },
              { active: false, key: 2, label: 'Second', panel: 'Bar' },
              { active: true, key: 3, label: 'Third', panel: 'Baz' },
            ]}
          />,
        );

        expect(getByName('tabpanel', 'First')).toBeVisible();
        expect(getByName('tabpanel', 'Third')).toBeVisible();

        // Should this be expect().not.toBeVisible()? Since the tab
        // aria-controls the panel, perhaps the panel must exist.
        expect((): void => {
          getByName('tabpanel', 'Second');
        }).toThrow();
      });
    });

    it('should set aria-controls', (): void => {
      const { getByName } = render(
        <Tabs
          tabs={[{ active: true, key: 1, label: 'First', panel: 'Foo' }]}
        />,
      );

      const tabPanel: HTMLElement = getByName('tabpanel', 'First');
      expect(tabPanel).toHaveAttribute('aria-controls');
    });
  });

  it('should contain a tab list and tab panel', (): void => {
    const { getByName, getByRole } = render(
      <Tabs
        tabs={[{ active: true, key: 1, label: 'First', panel: 'Hello world' }]}
      />,
    );

    const tabList: HTMLElement = getByRole('tablist');
    const tabPanel: HTMLElement = getByName('tabpanel', 'First');
    expect(tabList).toHaveTextContent('First');
    expect(tabPanel).toHaveTextContent('Hello world');
  });
});

/**
 * TODO: "Authors MUST manage focus on this container role."
 * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
 */
