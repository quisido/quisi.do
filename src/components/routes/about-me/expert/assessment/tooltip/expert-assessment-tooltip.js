import React from 'react';
import withStyles from './expert-assessment-tooltip-styles';
import ordinal from './utils/ordinal';

export default withStyles(
  function ExpertAssessmentTooltip({ children, classes, percentile }) {
    return (
      <>
        <div className={classes.title}>
          {children}
        </div>
        {ordinal(percentile)} Percentile
      </>
    );
  }
);
