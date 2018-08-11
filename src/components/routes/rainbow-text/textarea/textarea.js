import React from 'react';
import withStyles from './textarea-styles';

class Textarea extends React.PureComponent {
  render() {
    const props = {...this.props};
    if (!Object.prototype.hasOwnProperty.call(this.props, 'onChange')) {
      props.readOnly = true;
    }
    return (
      <textarea
        className={this.props.classes.root}
        rows="7"
        {...props}
      />
    );
  }
}

export default withStyles(Textarea);
