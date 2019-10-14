import { Typography } from '@material-ui/core';
import React from 'react';
import withStyles from './article-link-secondary-styles';

const numberFormat = n =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default withStyles(
  function ArticleLinkSecondary({
    children,
    claps = 0,
    classes,
    comments_count = 0,
    positive_reactions_count = 0,
    readingTime = 0,
    reads = 0,
    views = 0,
  }) {
    if (
      claps === 0 &&
      comments_count === 0 &&
      positive_reactions_count === 0 &&
      reads === 0 &&
      views === 0
    ) {
      return children;
    }

    const likes = claps + comments_count + positive_reactions_count;

    return (
      <>
        {children}
        <Typography
          className={classes.root}
          variant="caption"
        >
          <span>
            <span aria-label="View Count" role="img">
              👁️
            </span>{' '}
            {numberFormat(views)} Views
          </span>
          <span>
            <span aria-label="Read Count" role="img">
              📖
            </span>{' '}
            {numberFormat(reads)} Reads
          </span>
          <span>
            <span aria-label="Reader Applause" role="img">
              👍
            </span>{' '}
            {numberFormat(likes)} Likes
          </span>
          <span>
            <span aria-label="Reading Time" role="img">
              ⏲
            </span>{' '}
            {numberFormat(readingTime)} minute read
          </span>
        </Typography>
      </>
    );
  }
);
