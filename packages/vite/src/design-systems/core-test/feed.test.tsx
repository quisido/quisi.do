import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';
import { waitFor } from '@testing-library/react';

const { Feed } = await importTestedDesignSystem();

const ARTICLES = [
  {
    children: 'First content',
    heading: 'First article',
    key: 'first',
  },
  {
    children: 'Second content',
    heading: 'Second article',
    key: 'second',
  },
  {
    children: 'Third content',
    heading: 'Third article',
    key: 'third',
  },
] as const;

describe('Feed', (): void => {
  it('should support labelled by', (): void => {
    const { getByName } = render(
      <>
        <span id="test-feed-label-id">Test labelled by</span>
        <Feed articles={[]} labelledBy="test-feed-label-id" />
      </>,
    );

    getByName('feed', 'Test labelled by');
  });

  it('should contain a stream of article children', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed articles={ARTICLES} labelledBy="test-feed-label-id" />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    const first: HTMLElement = getByName('article', 'First article');
    const second: HTMLElement = getByName('article', 'Second article');
    const third: HTMLElement = getByName('article', 'Third article');
    expect(getRoleCount('article')).toBe(3);
    expect(feed).toContainElement(first);
    expect(feed).toContainElement(second);
    expect(feed).toContainElement(third);
    expect(Array.from(feed.children)).toStrictEqual([first, second, third]);
  });

  it('should expose endpoint load controls as feed articles', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={ARTICLES}
          labelledBy="test-feed-label-id"
          onAppend={(): Promise<void> => Promise.resolve()}
          onPrepend={(): Promise<void> => Promise.resolve()}
        />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    const prepend: HTMLElement = getByName('article', 'Prepend articles');
    const first: HTMLElement = getByName('article', 'First article');
    const second: HTMLElement = getByName('article', 'Second article');
    const third: HTMLElement = getByName('article', 'Third article');
    const append: HTMLElement = getByName('article', 'Append articles');

    expect(getRoleCount('article')).toBe(5);
    expect(Array.from(feed.children)).toStrictEqual([
      prepend,
      first,
      second,
      third,
      append,
    ]);
    expect(prepend).toHaveAttribute('tabindex', '0');
    expect(append).toHaveAttribute('tabindex', '0');
    expect(getByName('button', 'Prepend articles')).toBeInTheDocument();
    expect(getByName('button', 'Append articles')).toBeInTheDocument();
  });

  it('should expose when articles are not being added or removed', (): void => {
    const { getByName } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed articles={ARTICLES} labelledBy="test-feed-label-id" />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    expect(feed).toHaveAttribute('aria-busy', 'false');
  });

  it('should expose when articles are appending', async (): Promise<void> => {
    let resolveAppend!: () => void;
    const handleAppend = vi.fn(
      (): Promise<void> =>
        new Promise((resolve: () => void): void => {
          resolveAppend = resolve;
        }),
    );

    const { clickButton, getByName } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={ARTICLES}
          labelledBy="test-feed-label-id"
          onAppend={handleAppend}
        />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    await clickButton('Append articles');
    expect(handleAppend).toHaveBeenCalledExactlyOnceWith();
    expect(feed).toHaveAttribute('aria-busy', 'true');
    expect(getByName('button', 'Append articles')).toBeDisabled();

    resolveAppend();
    await waitFor((): void => {
      expect(feed).toHaveAttribute('aria-busy', 'false');
    });
    expect(getByName('button', 'Append articles')).toBeEnabled();
  });

  it('should stay busy while appended articles are rendered', async (): Promise<void> => {
    let resolveAppend!: () => void;
    const handleAppend = vi.fn(
      (): Promise<void> =>
        new Promise((resolve: () => void): void => {
          resolveAppend = resolve;
        }),
    );

    const { clickButton, getByName, rerender } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={ARTICLES}
          labelledBy="test-feed-label-id"
          onAppend={handleAppend}
        />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    await clickButton('Append articles');
    expect(feed).toHaveAttribute('aria-busy', 'true');

    rerender(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={[
            ...ARTICLES,
            {
              children: 'Fourth content',
              heading: 'Fourth article',
              key: 'fourth',
            },
          ]}
          labelledBy="test-feed-label-id"
          onAppend={handleAppend}
        />
      </>,
    );

    const fourth: HTMLElement = getByName('article', 'Fourth article');
    const append: HTMLElement = getByName('article', 'Append articles');
    expect(feed).toHaveAttribute('aria-busy', 'true');
    expect(Array.from(feed.children).slice(-2)).toStrictEqual([
      fourth,
      append,
    ]);

    resolveAppend();
    await waitFor((): void => {
      expect(feed).toHaveAttribute('aria-busy', 'false');
    });
  });

  it('should expose when articles are prepending', async (): Promise<void> => {
    let resolvePrepend!: () => void;
    const handlePrepend = vi.fn(
      (): Promise<void> =>
        new Promise((resolve: () => void): void => {
          resolvePrepend = resolve;
        }),
    );

    const { clickButton, getByName } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={ARTICLES}
          labelledBy="test-feed-label-id"
          onPrepend={handlePrepend}
        />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    await clickButton('Prepend articles');
    expect(handlePrepend).toHaveBeenCalledExactlyOnceWith();
    expect(feed).toHaveAttribute('aria-busy', 'true');
    expect(getByName('button', 'Prepend articles')).toBeDisabled();

    resolvePrepend();
    await waitFor((): void => {
      expect(feed).toHaveAttribute('aria-busy', 'false');
    });
    expect(getByName('button', 'Prepend articles')).toBeEnabled();
  });

  it('should stay busy while prepended articles are rendered', async (): Promise<void> => {
    let resolvePrepend!: () => void;
    const handlePrepend = vi.fn(
      (): Promise<void> =>
        new Promise((resolve: () => void): void => {
          resolvePrepend = resolve;
        }),
    );

    const { clickButton, getByName, rerender } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={ARTICLES}
          labelledBy="test-feed-label-id"
          onPrepend={handlePrepend}
        />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    await clickButton('Prepend articles');
    expect(feed).toHaveAttribute('aria-busy', 'true');

    rerender(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={[
            {
              children: 'Intro content',
              heading: 'Intro article',
              key: 'intro',
            },
            ...ARTICLES,
          ]}
          labelledBy="test-feed-label-id"
          onPrepend={handlePrepend}
        />
      </>,
    );

    const prepend: HTMLElement = getByName('article', 'Prepend articles');
    const intro: HTMLElement = getByName('article', 'Intro article');
    expect(feed).toHaveAttribute('aria-busy', 'true');
    expect(Array.from(feed.children).slice(0, 2)).toStrictEqual([
      prepend,
      intro,
    ]);

    resolvePrepend();
    await waitFor((): void => {
      expect(feed).toHaveAttribute('aria-busy', 'false');
    });
  });

  it('should expose load failures without staying busy', async (): Promise<void> => {
    const handleAppend = vi.fn((): Promise<void> => {
      return Promise.reject(new Error('Unable to append articles'));
    });

    const { clickButton, getByName } = render(
      <>
        <span id="test-feed-label-id">News feed</span>
        <Feed
          articles={ARTICLES}
          labelledBy="test-feed-label-id"
          onAppend={handleAppend}
        />
      </>,
    );

    const feed: HTMLElement = getByName('feed', 'News feed');
    await clickButton('Append articles');

    await waitFor((): void => {
      expect(feed).toHaveAttribute('aria-busy', 'false');
      expect(feed).toHaveAttribute('aria-errormessage');
    });

    const errorMessageId: string | null =
      feed.getAttribute('aria-errormessage');
    if (errorMessageId === null) {
      throw new Error('Expected feed to reference an error message.');
    }

    const errorMessage: HTMLElement | null =
      window.document.getElementById(errorMessageId);
    if (errorMessage === null) {
      throw new Error('Expected feed error message element.');
    }

    expect(errorMessage).toHaveTextContent('Unable to append articles');
  });

  describe('articles', (): void => {
    it('should be focusable', (): void => {
      const { getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed
            articles={[
              {
                children: 'First content',
                heading: 'First article',
                key: 'first',
              },
            ]}
            labelledBy="test-feed-label-id"
          />
        </>,
      );

      const article: HTMLElement = getByName('article', 'First article');
      expect(article).toHaveAttribute('tabindex', '0');
    });

    it('should scroll an article into view when focused', (): void => {
      const scrollIntoView = vi
        .spyOn(HTMLElement.prototype, 'scrollIntoView')
        .mockImplementation((): void => undefined);
      const { focus, getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed articles={ARTICLES} labelledBy="test-feed-label-id" />
        </>,
      );

      try {
        const article: HTMLElement = getByName('article', 'Second article');
        focus(article);

        expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
      } finally {
        scrollIntoView.mockRestore();
      }
    });

    it('should move keyboard focus among articles', async (): Promise<void> => {
      const { click, getByName, shiftTab, tab } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed articles={ARTICLES} labelledBy="test-feed-label-id" />
        </>,
      );

      const first: HTMLElement = getByName('article', 'First article');
      const second: HTMLElement = getByName('article', 'Second article');
      const third: HTMLElement = getByName('article', 'Third article');

      await click(first);
      expect(first).toHaveFocus();
      await tab();
      expect(second).toHaveFocus();
      await tab();
      expect(third).toHaveFocus();
      await shiftTab();
      expect(second).toHaveFocus();
    });

    it('should support an external label', (): void => {
      const { getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <span id="external-article-label-id">Externally labelled story</span>
          <Feed
            articles={[
              {
                children: 'Story content',
                key: 'story',
                labelledBy: 'external-article-label-id',
              },
            ]}
            labelledBy="test-feed-label-id"
          />
        </>,
      );

      getByName('article', 'Externally labelled story');
    });

    it('should support a description for scanning articles', (): void => {
      const { getByDescription } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <span id="article-summary-id">Brief article summary</span>
          <Feed
            articles={[
              {
                children: 'Story content',
                describedBy: 'article-summary-id',
                heading: 'Article with summary',
                key: 'story',
              },
            ]}
            labelledBy="test-feed-label-id"
          />
        </>,
      );

      getByDescription('article', 'Brief article summary');
    });

    it('should support position in set and set size', (): void => {
      const { getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed
            articles={[
              {
                children: 'First content',
                heading: 'First article',
                key: 'first',
              },
              {
                children: 'Second content',
                heading: 'Second article',
                key: 'second',
              },
            ]}
            articlesOffset={2}
            labelledBy="test-feed-label-id"
            setSize={5}
          />
        </>,
      );

      const first: HTMLElement = getByName('article', 'First article');
      const second: HTMLElement = getByName('article', 'Second article');
      expect(first).toHaveAttribute('aria-posinset', '3');
      expect(first).toHaveAttribute('aria-setsize', '5');
      expect(second).toHaveAttribute('aria-posinset', '4');
      expect(second).toHaveAttribute('aria-setsize', '5');
    });

    it('should default to an unknown set size', (): void => {
      const { getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed articles={ARTICLES} labelledBy="test-feed-label-id" />
        </>,
      );

      const first: HTMLElement = getByName('article', 'First article');
      expect(first).toHaveAttribute('aria-setsize', '-1');
    });

    it('should request prepended articles before focus reaches the start', (): void => {
      const handlePrepend = vi.fn((): Promise<void> => Promise.resolve());
      const { focus, getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed
            articles={ARTICLES}
            labelledBy="test-feed-label-id"
            onPrepend={handlePrepend}
          />
        </>,
      );

      focus(getByName('article', 'Second article'));
      expect(handlePrepend).toHaveBeenCalledExactlyOnceWith();
    });

    it('should request appended articles before focus reaches the end', (): void => {
      const handleAppend = vi.fn((): Promise<void> => Promise.resolve());
      const { focus, getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed
            articles={ARTICLES}
            labelledBy="test-feed-label-id"
            onAppend={handleAppend}
          />
        </>,
      );

      focus(getByName('article', 'Second article'));
      expect(handleAppend).toHaveBeenCalledExactlyOnceWith();
    });

    it('should request more articles when focus reaches a descendant', (): void => {
      const handleAppend = vi.fn((): Promise<void> => Promise.resolve());
      const handlePrepend = vi.fn((): Promise<void> => Promise.resolve());
      const scrollIntoView = vi
        .spyOn(HTMLElement.prototype, 'scrollIntoView')
        .mockImplementation((): void => undefined);
      const { focus, getByName } = render(
        <>
          <span id="test-feed-label-id">Test feed</span>
          <Feed
            articles={[
              {
                children: 'First content',
                heading: 'First article',
                key: 'first',
              },
              {
                children: <button type="button">Read second</button>,
                heading: 'Second article',
                key: 'second',
              },
              {
                children: 'Third content',
                heading: 'Third article',
                key: 'third',
              },
            ]}
            labelledBy="test-feed-label-id"
            onAppend={handleAppend}
            onPrepend={handlePrepend}
          />
        </>,
      );

      try {
        focus(getByName('button', 'Read second'));

        expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
        expect(handlePrepend).toHaveBeenCalledExactlyOnceWith();
        expect(handleAppend).toHaveBeenCalledExactlyOnceWith();
      } finally {
        scrollIntoView.mockRestore();
      }
    });
  });
});
