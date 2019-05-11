import { Button } from '@material-ui/core';
import React from 'react';
import withStyles from './resume-styles';

const VERSION = '2019-05';

export default withStyles(
  function Resume({ classes }) {
    return (
      <div className={classes.root}>
        <a
          href={`/resume/${VERSION}/charles-stover-resume.pdf`}
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="Download Résumé as a PDF"
        >
          <Button variant="contained" color="primary">
            Download Resume (PDF)
          </Button>
        </a>
      </div>
    );
  }
);
