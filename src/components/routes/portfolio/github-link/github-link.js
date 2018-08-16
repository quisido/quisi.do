import React from 'react';
import Link from '../link/portfolio-link';

export default class GitHubLink extends React.PureComponent {

  get href() {
    return 'https://github.com/' + this.org + '/' + this.props.repo;
  }

  get org() {
    return this.props.org || 'CharlesStover';
  }

  get title() {
    return this.org + '/' + this.props.repo + ': ' + this.props.description;
  }

  render() {
    return (
      <Link
        children={this.props.title || this.props.repo}
        description={this.props.description}
        href={this.href}
        title={this.title}
      />
    );
  }
}
