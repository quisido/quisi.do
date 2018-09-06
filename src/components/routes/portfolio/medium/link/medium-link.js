import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './medium-link-styles';

class MediumLink extends React.PureComponent {

  _listItemTextClasses = createObjectProp();

  get listItemTextClasses() {
    return this._listItemTextClasses({
      primary: this.props.classes.primary
    });
  }

  get titleHref() {
    return (
      this.props.title
        .toLowerCase()
        .replace(/[^a-z\d\s-]+/g, '')
        .replace(/\s+/g, '-')
    );
  }

  render() {
    return (
      <ListItem className={this.props.classes.root}>
        <a
          className={this.props.classes.link}
          href={'https://medium.com/@Charles_Stover/' + this.titleHref + '-' + this.props.id}
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
            secondary={this.props.description}
          />
        </a>
      </ListItem>
    );
  }
}

export default withStyles(MediumLink);
