import { Button } from '@material-ui/core';
import React from 'react';
import routes from './portfolio-routes';
import withStyles from './portfolio-styles';
import Sections from './sections/portfolio-sections';

const handleBackToTop = e => {
  e.preventDefault();
  document.body.scrollIntoView();
  return false;
};

const handleRouteRef = ref => {
  if (ref) {
    document.body.scrollIntoView();
  }
};

export default withStyles(
  function Portfolio({ classes, location }) {
    const route = routes.find(route =>
      location.pathname === `/portfolio/${route.path}/`,
    );
    return (
      <div className={classes.root}>
        <Sections
          paper
          pathname={location.pathname}
        />
        {
          typeof route !== 'undefined' &&
          <route.component ref={handleRouteRef}>
            <Button
              className={classes.backToTop}
              color="secondary"
              onClick={handleBackToTop}
              variant="outlined"
            >
              Back to Top
            </Button>
          </route.component>
        }
      </div>
    );
  },
);
