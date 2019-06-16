import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import mediumUrl from '../../../../../utils/medium-url';
import withStyles from './medium-link-styles';
import Secondary from './secondary';

export default withStyles(
  function MediumLink({ classes, description, icon, id, title, ...stats }) {
    return (
      <ListItem className={classes.root}>
        <a
          className={classes.link}
          href={mediumUrl(id, title)}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <ListItemIcon>
            <span className={classes.icon}>
              {icon}
            </span>
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.primary
            }}
            className={classes.text}
            primary={title}
            secondary={
              <Secondary {...stats}>
                {description}
              </Secondary>
            }
          />
        </a>
      </ListItem>
    );
  }
);
