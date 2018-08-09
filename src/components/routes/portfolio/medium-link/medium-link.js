import React from 'react';
import withStyles from './medium-link-styles';

class MediumLink extends React.PureComponent {

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
      <li className={this.props.classes.root}>
        <a
          children={this.props.title}
          href={this.href}
          rel="nofollow noopener noreferrer"
        />
      </li>
    );
  }
}

export default withStyles(MediumLink);
