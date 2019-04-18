import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import npm from '../../../../assets/npm';
import Link from './link/npm-link';
import npmDownloads from './npm-downloads';
import withStyles from './npm-styles';

const sortPackagesByDownloads = (
  [ _icon1, pkg1, _description1, downloads1, _data1 ],
  [ _icon2, pkg2, _description2, downloads2, _data2 ],
) => {
  if (downloads1 < downloads2) {
    return 1;
  }
  if (downloads1 > downloads2) {
    return -1;
  }
  if (pkg1 < pkg2) {
    return 1;
  }
  return 1;
};

const sum = (total, iteration) => total + iteration;

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
            pkg.push(
              Object.prototype.hasOwnProperty.call(data, PACKAGE_NAME) ?
                data[PACKAGE_NAME].reduce(sum, 0) :
                0
            );
            pkg.push(data[PACKAGE_NAME] || [ ]);
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
          children="NPM Packages"
          className={this.props.classes.title}
          variant="headline"
        />
        <List className={this.props.classes.list}>
          {
            npmPackages.map(([ icon, pkg, description, downloads = [] ]) =>
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
              downloads={this.state.misc.reduce(sum, 0)}
              icon="❓"
            />
          }
        </List>
        {
          this.state.error &&
          <Typography
            children={this.state.error}
            className={this.props.classes.error}
            variant="body1"
          />
        }
      </Paper>
    );
  }
}

export default withStyles(Npm);
