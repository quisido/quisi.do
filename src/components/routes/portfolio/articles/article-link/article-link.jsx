import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import mediumUrl from '../../../../../utils/medium-url';
import withStyles from './article-link-styles';
import Secondary from './secondary';

export default withStyles(
  function ArticleLink({ classes, description, icon, mediumId, path, title, ...stats }) {
    let Component;
    let href;
    let rel;
    let target;
    let to;

    if (path) {
      Component = Link;
      to = path;
    } else {
      Component = 'a';
      href = mediumUrl(mediumId, title);
      rel = 'nofollow noopener noreferrer';
      target = '_blank';
    }

    return (
      <ListItem className={classes.root}>
        <Component
          className={classes.link}
          href={href}
          rel={rel}
          target={target}
          to={to}
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
        </Component>
      </ListItem>
    );
  }
);
