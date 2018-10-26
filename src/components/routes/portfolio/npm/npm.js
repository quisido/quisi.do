import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Link from './link/npm-link';
import npmDownloads from './npm-downloads';
import withStyles from './npm-styles';

class Npm extends React.PureComponent {

  mounted = true;

  state = {
    error: null,
    misc: null
  };

  componentDidMount() {
    npmDownloads.fetch()
      .then(data => {
        if (this.mounted) {
          this.setState({
            misc: data['@']
          });
        }
      })
      .catch(err => {
        if (this.mounted) {
          this.setState({
            error: 'An error occurred while determining the download count of the packages: ' + err.message
          });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  get error() {
    if (this.state.error === null) {
      return null;
    }
    return (
      <Typography
        children={this.state.error}
        className={this.props.classes.error}
        variant="body1"
      />
    );
  }

  get misc() {
    if (this.state.misc === null) {
      return null;
    }
    return (
      <Link
        description=""
        icon="❓"
      />
    );
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
          <Link
            package="@charlesstover/hsl2rgb"
            description="Convert HSL to RGB."
            icon="🎨"
          />
          <Link
            package="@gamingmedley/konami.js"
            description="Allows web developers to implement the Konami code on their webpages."
            icon="🎮"
          />
          <Link
            package="delimiter"
            description="Places delimiters between items in an array."
            icon="🗂️"
          />
          <Link
            package="fetch-action-creator"
            description="Fetches using standardized, four-part asynchronous actions for redux-thunk."
            icon="🎾"
          />
          <Link
            package="mssql-query-builder"
            description="Dynamically build Microsoft SQL Server queries using JavaScript."
            icon="🏗️"
          />
          <Link
            package="pluralsight-score"
            description="A mobile-responsive bell curve graph mimicking Pluralsight's assessment exam results."
            icon="📈"
          />
          <Link
            package="rainbow-gradient"
            description="Generates a gradient of the colors of the rainbow."
            icon="🌈"
          />
          <Link
            package="react-innertext"
            description="Returns the innerText of a React JSX object."
            icon="📝"
          />
          <Link
            package="react-mui-tooltip"
            description="A React tooltip similar to Material UI's design."
            icon="💭"
          />
          <Link
            package="react-multi-context"
            description="Manage multiple contexts with a single React component."
            icon="💕"
          />
          <Link
            package="react-object-prop"
            description="Caches Object props in React so as to prevent unnecessary re-rendering."
            icon="💡"
          />
          <Link
            package="react-portfolio"
            description="A sleek portfolio design created in React."
            icon="📁"
          />
          <Link
            package="react-quotes-carousel"
            description="A quotes carousel for React."
            icon="💬"
          />
          <Link
            package="react-rainbow-text"
            description="Generates rainbow-colored text in React."
            icon="🌈"
          />
          <Link
            package="reactn"
            description="A React clone that extends components with built-in global state."
            icon="🌎"
          />
          <Link
            package="rn-webview"
            description="An implementation of React Native's WebView that allows for window.postMessage on iOS devices."
            icon="🕸"
          />
          <Link
            package="use-force-update"
            description="A React 16.7 Hook allowing the forced update of a functional component."
            icon="🆕"
          />
          <Link
            package="use-react-router"
            description="A React 16.7 Hook incorporating react-router's context and rerendering on history state change."
            icon="🗺️"
          />
          <Link
            package="with-router"
            description="A pub-sub implementation of the react-router withRouter HOC."
            icon="🔔"
          />
          {this.misc}
        </List>
        {this.error}
      </Paper>
    );
  }
}

export default withStyles(Npm);
