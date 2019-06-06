import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import SparklineSvg from 'sparkline-svg';
import withStyles from './npm-link-styles';
import Secondary from './secondary';

export default withStyles(
  function NpmLink({ classes, description, downloads, icon, package: pkg }) {
    const packageName = pkg || 'Other Packages';

    // Generate a sparkline.
    const sparklineValues = [...downloads].reverse();
    let i = 0;
    while (sparklineValues.length > 75) {
      const [ droppedValue ] = sparklineValues.splice(i, 1);
      sparklineValues[i] = (sparklineValues[i] + droppedValue) / 2;
      i = (i + 1) % (sparklineValues.length - 1);
    }
    const sparkline = new SparklineSvg(sparklineValues);
    sparkline.setDesc(`${packageName} downloads over time`);
    sparkline.setFill(`hsla(0, 50%, 50%, 3.33%)`);
    sparkline.setStroke(`hsla(0, 50%, 50%, 6.67%)`);
    sparkline.setTitle(`${packageName} downloads over time`);

    return (
      <ListItem className={classes.root}>
        <a
          className={classes.link}
          href={
            pkg ?
              `https://www.npmjs.com/package/${pkg}` :
              'https://www.npmjs.com/~charlesstover'
          }
          rel="nofollow noopener noreferrer"
          style={{
            backgroundImage: `url(${sparkline.dataUri})`,
          }}
          target="_blank"
          title={
            pkg ?
              `${pkg} - npm` :
              '@charlesstover - npm'
          }
        >
          <ListItemIcon>
            <span className={classes.icon}>
              {icon}
            </span>
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.primary,
            }}
            className={classes.text}
            primary={packageName}
            secondary={
              <Secondary downloads={downloads}>
                {description}
              </Secondary>
            }
          />
        </a>
      </ListItem>
    );
  }
);
