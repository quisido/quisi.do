import { CircularProgress } from '@material-ui/core';
import React from 'react';

let npmDownloads = null;

class Popularity extends React.PureComponent {

  state = {
    error: null
  };

  componentDidMount() {
    if (npmDownloads === null) {
      fetch(process.env.REACT_APP_NPM_DOWNLOADS_API)
        .then(response => response.json())
        .then(downloads => {
          npmDownloads = Object.entries(downloads);;
          this.forceUpdate();
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  render() {

    // Error
    if (this.state.error !== null) {
      return <div children={this.state.error} />;
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
