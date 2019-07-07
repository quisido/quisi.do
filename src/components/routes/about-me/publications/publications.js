import { List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import { Link } from 'react-router-dom';
import articles from '../../../../assets/articles';
import mediumUrl from '../../../../utils/medium-url';
import withStyles from './publications-styles';

const months = [ 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.',  'Nov.', 'Dec.' ];

class Publications extends React.PureComponent {

  _linkItemTextClasses = createObjectProp();

  get linkItemTextClasses() {
    return this._linkItemTextClasses({
      primary: this.props.classes.listItemTextPrimary
    });
  }

  mapArticles = article => {
    let Component;
    let href;
    let rel;
    let target;
    let to;
    if (article.path) {
      Component = Link;
      to = article.path;
    } else {
      Component = 'a';
      href = mediumUrl(article.mediumId, article.title);
      rel = 'nofollow noopener noreferrer';
      target = '_blank';
    }
    return (
      <ListItem
        className={this.props.classes.listItem}
        key={article.path || article.mediumId}
      >
        <ListItemText classes={this.linkItemTextClasses}>
          <span className={this.props.classes.link}>
            <Component
              href={href}
              rel={rel}
              target={target}
              to={to}
            >
              {article.title}
            </Component>{' '}
            <Typography
              className={this.props.classes.caption}
              variant="caption"
            >
              ({article.date.getFullYear()}{' '}
              {months[article.date.getMonth()]}{' '}
              {article.date.getDate()})
            </Typography>
          </span>
          <Tooltip title={article.description}>
            <span className={this.props.classes.help}>
              ?
            </span>
          </Tooltip>
        </ListItemText>
      </ListItem>
    );
  };

  render() {
    return (
      <List className={this.props.classes.list}>
        {articles.slice(0, 4).map(this.mapArticles)}
      </List>
    );
  }
}

export default withStyles(Publications);
