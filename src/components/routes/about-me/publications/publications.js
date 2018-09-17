import { List, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import medium from '../../../../assets/medium';
import mediumUrl from '../../../../constants/medium-url';
import withStyles from './publications-styles';

const months = [ 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.',  'Nov.', 'Dec.' ];

class Publications extends React.PureComponent {

  _linkItemTextClasses = createObjectProp();

  get linkItemTextClasses() {
    return this._linkItemTextClasses({
      primary: this.props.classes.listItemTextPrimary
    });
  }

  mapMedium = article =>
    <ListItem
      className={this.props.classes.listItem}
      key={article.id}
    >
      <ListItemText classes={this.linkItemTextClasses}>
        <span className={this.props.classes.link}>
          <a
            children={article.title}
            href={mediumUrl(article.id, article.title)}
            rel="nofollow noopener noreferrer"
            target="_blank"
          />{' '}
          <Typography
            children={'(' + article.date.getFullYear() + ' ' + months[article.date.getMonth()] + ' ' + article.date.getDate() + ')'}
            className={this.props.classes.caption}
            variant="caption"
          />
        </span>
        <Tooltip title={article.description}>
          <span
            children="?"
            className={this.props.classes.help}
          />
        </Tooltip>
      </ListItemText>
    </ListItem>;

  render() {
    return (
      <List
        children={medium.slice(0, 4).map(this.mapMedium)}
        className={this.props.classes.list}
      />
    );
  }
}

export default withStyles(Publications);
