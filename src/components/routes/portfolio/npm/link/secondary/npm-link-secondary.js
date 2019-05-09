import { Typography } from '@material-ui/core';
import React from 'react';
import withStyles from './npm-link-secondary-styles.js';

const COMMA_DELIMIT = /\B(?=(?:\d{3})+(?!\d))/g;
const NO_BREAK_SPACE = '\u00A0';

export default withStyles(
  function NpmLinkSecondary({ children, classes, downloads }) {
    return (
      <>
        {children}
        <Typography
          className={classes.root}
          variant="caption"
        >
          {
            downloads === 0 ?
              NO_BREAK_SPACE :
              downloads
                .toString()
                .replace(COMMA_DELIMIT, ',') +
                ' downloads'
          }
        </Typography>
      </>
    )
  }
);
