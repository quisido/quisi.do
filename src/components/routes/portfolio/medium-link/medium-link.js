import React from 'react';
import Link from '../link/portfolio-link';

export default class MediumLink extends React.PureComponent {

  get href() {
    return 'https://medium.com/@Charles_Stover/' + this.titleHref + '-' + this.props.id;
  }

  get titleHref() {
    return (
      this.props.title
        .toLowerCase()
        .replace(/[^a-z\d\s-]+/g, '')
        .replace(/\s+/g, '-')
    );
  }

  render() {
    return (
      <Link
        children={this.props.title}
        href={this.href}
        title={this.props.title + ' – Charles Stover – Medium'}
      />
    );
  }
}
