import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './github-link-styles';

class GitHubLink extends React.PureComponent {

  _listItemTextClasses = createObjectProp();

  get listItemTextClasses() {
    return this._listItemTextClasses({
      primary: this.props.classes.primary
    });
  }

  get org() {
    return this.props.org || 'CharlesStover';
  }

  render() {
    return (
      <ListItem className={this.props.classes.root}>
        <Tooltip
          placement="left"
          title={this.org + '/' + this.props.repo}
        >
          <a
            className={this.props.classes.link}
            href={'https://github.com/' + this.org + '/' + this.props.repo}
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
              primary={this.props.title || this.props.repo}
              secondary={this.props.description}
            />
          </a>
        </Tooltip>
      </ListItem>
    );
  }
}

export default withStyles(GitHubLink);
