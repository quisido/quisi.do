import { Typography } from '@material-ui/core';
import React from 'react';
import withStyles from './npm-link-secondary-styles.js';

const COMMA_DELIMIT = /\B(?=(?:\d{3})+(?!\d))/g;
const NO_BREAK_SPACE = '\u00A0';

const sum = (total, count) => total + count;

export default withStyles(
  function NpmLinkSecondary({ children, classes, downloads }) {
    const downloadsSum = downloads.reduce(sum, 0);
    return (
      <>
        {children}
        <Typography
          className={classes.root}
          variant="caption"
        >
          {
            downloadsSum === 0 ?
              NO_BREAK_SPACE :
              downloadsSum
                .toString()
                .replace(COMMA_DELIMIT, ',') +
                ' downloads'
          }
        </Typography>
      </>
    )
  }
);
