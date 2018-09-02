import { CircularProgress } from '@material-ui/core';
import React from 'react';

let npmDownloads = null;

class Popularity extends React.PureComponent {

  mounted = true;

  state = {
    error: null
  };

  componentDidMount() {
    if (npmDownloads === null) {
      fetch(process.env.REACT_APP_NPM_DOWNLOADS_API)
        .then(response => response.json())
        .then(downloads => {
          if (this.mounted) {
            npmDownloads = Object.entries(downloads);
            this.forceUpdate();
          }
        })
        .catch(error => {
          if (this.mounted) {
            this.setState({ error });
          }
        });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    // Error
    if (this.state.error !== null) {
      return <div children={this.state.error.message} />;
    }

    // Loading
    if (npmDownloads === null) {
      return <CircularProgress />;
    }

    // Data
    return npmDownloads.map(([ pkg, downloads ]) =>
      <div key={pkg}>
        {pkg}: {downloads}
      </div>
    );
  }
}

export default Popularity;
