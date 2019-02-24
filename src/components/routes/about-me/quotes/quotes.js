import { Button } from '@material-ui/core';
import React from 'react';
import Quote from './quote/quote';
import withStyles from './quotes-styles';

class Quotes extends React.PureComponent {

  state = {
    length: 2
  };

  handleClick = () => {
    this.setState(state => ({
      length: state.length + 2
    }));
  };

  mapQuotes = (quote, index) => {
    return (
      <Quote
        animate={index > 1}
        key={quote.author}
        {...quote}
      />
    );
  };

  get quotes() {
    return this.props.quotes.slice(0, this.state.length);
  }

  get viewMore() {
    if (this.state.length >= this.props.quotes.length) {
      return null;
    }
    return (
      <Button
        children="View more..."
        className={this.props.classes.viewMore}
        onClick={this.handleClick}
      />
    );
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {this.quotes.map(this.mapQuotes)}
        {this.viewMore}
      </div>
    );
  }
}

export default withStyles(Quotes);
