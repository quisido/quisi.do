import React from 'react';
import Icon from '../../icon/icon';
import withStyles from './assessment-styles';
import Tooltip from './tooltip';

const Assessment = ({
  classes, index, onClick, percentile, selected, title,
}) => {
  const className = selected
    ? `${classes.root} ${classes.selected}`
    : classes.root;
  return (
    <Icon
      className={className}
      index={index}
      onClick={onClick}
      tooltip={
        <Tooltip percentile={percentile}>
          {title}
        </Tooltip>
      }
    >
      {title}
    </Icon>
  );
};

export default withStyles(Assessment);
