import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './npm-link-styles';
import Secondary from './secondary';

class NpmLink extends React.PureComponent {

  _listItemTextClasses = createObjectProp();

  render() {
    return (
      <ListItem className={this.props.classes.root}>
        <a
          className={this.props.classes.link}
          href={
            this.props.package ?
              `https://www.npmjs.com/package/${this.props.package}` :
              'https://www.npmjs.com/~charlesstover'
          }
          rel="nofollow noopener noreferrer"
          target="_blank"
          title={
            this.props.package ?
              `${this.props.package} - npm` :
              '@charlesstover - npm'
          }
        >
          <ListItemIcon>
            <span className={this.props.classes.icon}>
              {this.props.icon}
            </span>
          </ListItemIcon>
          <ListItemText
            classes={this._listItemTextClasses({
              primary: this.props.classes.primary
            })}
            className={this.props.classes.text}
            primary={this.props.package || 'Other Packages'}
            secondary={
              <Secondary downloads={this.props.downloads}>
                {this.props.description}
              </Secondary>
            }
          />
        </a>
      </ListItem>
    );
  }
}

export default withStyles(NpmLink);
