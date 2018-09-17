import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import mediumUrl from '../../../../../constants/medium-url';
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
        <React.Fragment>
          <Typography
            children={this.props.subtitle}
            className={this.props.classes.subtitle}
            component="span"
            variant="subheading"
          />
          <span children={this.props.description} />
        </React.Fragment>
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
            <span
              children={this.props.icon}
              className={this.props.classes.icon}
            />
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
