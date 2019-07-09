import { Paper } from '@material-ui/core';
import React from 'react';
import Markdown from '../markdown';
import withStyles from './article-styles';
// import Fallback from '../route-suspense-fallback';

const conclusion = `
## Conclusion 🔚

To read more of my articles or follow my works, you may connect with me on
[LinkedIn](https://www.linkedin.com/in/charles-stover) and
[Twitter](https://twitter.com/CharlesStover). It’s quick, it’s easy, and it’s
free!

You can also check out my portfolio on
[CharlesStover.com](https://charlesstover.com/).
`;

const handleRef = ref => {
  if (ref) {
    document.body.scrollIntoView();
  }
};

export default withStyles(
  function Article({ children, classes, images }) {
    // return <Fallback />;
    return (
      <Paper
        className={classes.root}
        ref={handleRef}
      >
        <article>
          <Markdown images={images}>
            {children}
          </Markdown>
          <Markdown>{conclusion}</Markdown>
        </article>
      </Paper>
    );
  }
);
