import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import mediumUrl from '../../../../../utils/medium-url';
import withStyles from './medium-link-styles';

class MediumLink extends React.PureComponent {

  _listItemTextClasses = createObjectProp();

  get listItemTextClasses() {
    return this._listItemTextClasses({
      primary: this.props.classes.primary
    });
  }

  get listItemTextSecondary() {
    if (this.props.subtitle) {
      return (
        <>
          <Typography
            className={this.props.classes.subtitle}
            component="span"
            variant="subtitle1"
          >
            {this.props.subtitle}
          </Typography>
          <span>
            {this.props.description}
          </span>
        </>
      );
    }
    return this.props.description;
  }

  render() {
    return (
      <ListItem className={this.props.classes.root}>
        <a
          className={this.props.classes.link}
          href={mediumUrl(this.props.id, this.props.title)}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <ListItemIcon>
            <span className={this.props.classes.icon}>
              {this.props.icon}
            </span>
          </ListItemIcon>
          <ListItemText
            classes={this.listItemTextClasses}
            className={this.props.classes.text}
            primary={this.props.title}
            secondary={this.listItemTextSecondary}
          />
        </a>
      </ListItem>
    );
  }
}

export default withStyles(MediumLink);
