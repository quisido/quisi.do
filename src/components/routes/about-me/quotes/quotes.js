import { Button } from '@material-ui/core';
import React from 'react';
import Quote from './quote/quote';
import withStyles from './quotes-styles';

const mapQuotes = (quote, index) =>
  <Quote
    animate={index > 1}
    key={quote.author}
    {...quote}
  />;

class Quotes extends React.PureComponent {

  state = {
    length: 2
  };

  handleClick = () => {
    this.setState(state => ({
      length: state.length + 2
    }));
  };

  get quotes() {
    return this.props.quotes.slice(0, this.state.length);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {this.quotes.map(mapQuotes)}
        {
          this.state.length < this.props.quotes.length &&
          <Button
            className={this.props.classes.viewMore}
            color="secondary"
            onClick={this.handleClick}
            variant="outlined"
          >
            View more
          </Button>
        }
      </div>
    );
  }
}

export default withStyles(Quotes);
