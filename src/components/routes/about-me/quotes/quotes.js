import React from 'react';
import withStyles from './quotes-styles';

class Quotes extends React.PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
      </div>
    );
  }
}

export default withStyles(Quotes);
