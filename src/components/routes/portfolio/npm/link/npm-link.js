import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import npmDownloads from '../npm-downloads';
import withStyles from './npm-link-styles';

class NpmLink extends React.PureComponent {

  _listItemTextClasses = createObjectProp();
  mounted = true;
  state = {
    downloads: null
  };

  componentDidMount() {
    npmDownloads.fetch()
      .then(data => {
        if (
          this.mounted &&
          Object.prototype.hasOwnProperty.call(data, this.package)
        ) {
          this.setState({
            downloads: data[this.package]
          });
        }
      })

      // Error handling is done in ../npm, so we can ignore them here.
      .catch(() => {});
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  get downloads() {
    if (this.state.downloads === null) {
      return null;
    }
    return (
      (
        this.props.description ?
          ' - ' :
          ''
      ) +
      this.state.downloads.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + ' downloads'
    );
  }

  get href() {
    if (this.props.package) {
      return 'https://www.npmjs.com/package/' + this.props.package;
    }
    return 'https://www.npmjs.com/~charlesstover';
  }

  get listItemTextClasses() {
    return this._listItemTextClasses({
      primary: this.props.classes.primary
    });
  }

  get package() {
    return this.props.package || '@';
  }

  get primary() {
    return this.props.package || 'Other Packages';
  }

  get title() {
    if (this.props.package) {
      return this.props.package + ' - npm';
    }
    return '@charlesstover - npm';
  }

  render() {
    return (
      <ListItem className={this.props.classes.root}>
        <a
          className={this.props.classes.link}
          href={this.href}
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
            primary={this.primary}
            secondary={this.props.description + this.downloads}
          />
        </a>
      </ListItem>
    );
  }
}

export default withStyles(NpmLink);
