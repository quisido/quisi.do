import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
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
          Object.prototype.hasOwnProperty.call(data, this.props.package)
        ) {
          this.setState({
            downloads: data[this.props.package]
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
    return ' - ' + this.state.downloads + ' downloads';
  }

  get listItemTextClasses() {
    return this._listItemTextClasses({
      primary: this.props.classes.primary
    });
  }

  render() {
    return (
      <ListItem className={this.props.classes.root}>
        <Tooltip
          placement="left"
          title={this.props.package + ' - npm'}
        >
          <a
            className={this.props.classes.link}
            href={'https://www.npmjs.com/package/' + this.props.package}
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
              primary={
                <React.Fragment>
                  {this.props.package}
                  {this.downloads}
                </React.Fragment>
              }
              secondary={this.props.description}
            />
          </a>
        </Tooltip>
      </ListItem>
    );
  }
}

export default withStyles(NpmLink);
