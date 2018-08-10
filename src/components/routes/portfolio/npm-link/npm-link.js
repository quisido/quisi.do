import React from 'react';
import Link from '../link/portfolio-link';

export default class NpmLink extends React.PureComponent {
  render() {
    return (
      <Link
        children={this.props.package}
        description={this.props.description}
        href={'https://www.npmjs.com/package/' + this.props.package}
        title={this.props.package + ' - npm'}
      />
    );
  }
}
