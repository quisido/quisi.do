import { Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import Image from './image/image';
import withStyles from './quote-styles';

class Quote extends React.PureComponent {

  mapQuote = (quote, index) =>
    <Typography
      className={this.props.classes.p}
      key={index}
      paragraph
    >
      {quote}
    </Typography>;

  get quote() {
    if (Array.isArray(this.props.quote)) {
      return this.props.quote.map(this.mapQuote);
    }
    return this.mapQuote(this.props.quote);
  }

  render() {
    const className =
      this.props.classes.root + (
        this.props.animate ?
          ' ' + this.props.classes.animate :
          ''
      );
    return (
      <div className={className}>
        <div className={this.props.classes.image}>
          <Image
            alt={this.props.author}
            src={this.props.image}
          />
        </div>
        <div className={this.props.classes.quote}>
          <blockquote className={this.props.classes.blockquote}>
            {this.quote}
          </blockquote>
          {
            this.props.company ?
              <Tooltip
                placement="left"
                title={this.props.title}
              >
                <span className={this.props.classes.company}>
                  <cite className={this.props.classes.cite}>
                    {this.props.author}
                  </cite>,{' '}
                  {this.props.company}
                </span>
              </Tooltip> :
              <cite className={this.props.classes.cite}>
                {this.props.author}
              </cite>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(Quote);
