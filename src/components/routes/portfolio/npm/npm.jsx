import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import npm from '../../../../assets/npm';
import Link from './link';
import npmDownloads from './npm-downloads';
import withStyles from './npm-styles';
import sortPackagesByDownloads from './utils/sort-packages-by-downloads';

// Deep clone the NPM packages.
const npmPackages = npm.map(pkg => [...pkg]);

class Npm extends React.PureComponent {

  mounted = true;

  state = {
    error: null,
    misc: null,
  };

  componentDidMount() {
    npmDownloads.fetch()
      .then(data => {
        if (this.mounted) {
          for (const pkg of npmPackages) {
            const PACKAGE_NAME = pkg[1];
            pkg.push(data[PACKAGE_NAME] || []);
          }
          npmPackages.sort(sortPackagesByDownloads);
          this.setState({
            misc: data['@'],
          });
        }
      })
      .catch(err => {
        if (this.mounted) {
          this.setState({
            error:
              'An error occurred while determining the download count of ' +
              'the packages: ' + err.message,
          });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography
          className={this.props.classes.title}
          variant="h5"
        >
          NPM Packages
        </Typography>
        <List className={this.props.classes.list}>
          {
            npmPackages.map(([
              icon,
              pkg,
              description,
              downloads = [],
            ]) =>
              <Link
                description={description}
                downloads={downloads}
                icon={icon}
                key={pkg}
                package={pkg}
              />
            )
          }
          {
            this.state.misc &&
            <Link
              description=""
              downloads={this.state.misc}
              icon="❓"
            />
          }
        </List>
        {
          this.state.error &&
          <Typography className={this.props.classes.error}>
            {this.state.error}
          </Typography>
        }
        {this.props.children}
      </Paper>
    );
  }
}

export default withStyles(Npm);
