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
            description="Convert HSL to RGB."
            icon="🎨"
            package="@charlesstover/hsl2rgb"
          />
          <Link
            description="Allows web developers to implement the Konami code on their webpages."
            icon="🎮"
            package="@gamingmedley/konami.js"
          />
          <Link
            description="Places delimiters between items in an array."
            icon="🗂️"
            package="delimiter"
          />
          <Link
            description="Fetches using standardized, four-part asynchronous actions for redux-thunk."
            icon="🎾"
            package="fetch-action-creator"
          />
          <Link
            description="Dynamically build Microsoft SQL Server queries using JavaScript."
            icon="🏗️"
            package="mssql-query-builder"
          />
          <Link
            description="Generates a gradient of the colors of the rainbow."
            icon="🌈"
            package="rainbow-gradient"
          />
          <Link
            description="Returns the innerText of a React JSX object."
            icon="📝"
            package="react-innertext"
          />
          <Link
            description="A React tooltip similar to Material UI's design."
            icon="💭"
            package="react-mui-tooltip"
          />
          <Link
            description="Manage multiple contexts with a single React component."
            icon="💕"
            package="react-multi-context"
          />
          <Link
            description="Caches Object props in React so as to prevent unnecessary re-rendering."
            icon="💡"
            package="react-object-prop"
          />
          <Link
            description="A sleek portfolio design created in React."
            icon="📁"
            package="react-portfolio"
          />
          <Link
            description="A quotes carousel for React."
            icon="💬"
            package="react-quotes"
          />
          <Link
            description="Generates rainbow-colored text in React."
            icon="🌈"
            package="react-rainbow-text"
          />
          {this.misc}
        </List>
        {this.error}
      </Paper>
    );
  }
}

export default withStyles(Npm);
