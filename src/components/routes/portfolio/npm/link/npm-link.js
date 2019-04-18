import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import withStyles from './npm-link-styles';

const COMMA_DELIMIT = /\B(?=(?:\d{3})+(?!\d))/g;
const NO_BREAK_SPACE = '\u00A0';

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
            <span
              children={this.props.icon}
              className={this.props.classes.icon}
            />
          </ListItemIcon>
          <ListItemText
            classes={this._listItemTextClasses({
              primary: this.props.classes.primary
            })}
            className={this.props.classes.text}
            primary={this.props.package || 'Other Packages'}
            secondary={
              <React.Fragment>
                {this.props.description}
                <Typography
                  className={this.props.classes.downloads}
                  variant="caption"
                >
                  {
                    this.props.downloads === 0 ?
                      NO_BREAK_SPACE :
                      this.props.downloads
                        .toString()
                        .replace(COMMA_DELIMIT, ',') +
                        ' downloads'
                  }
                </Typography>
              </React.Fragment>
            }
          />
        </a>
      </ListItem>
    );
  }
}

export default withStyles(NpmLink);
