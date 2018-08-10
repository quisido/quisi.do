import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import withStyles from './radix-styles';

const handleFormSubmit = e => {
  e.preventDefault();
  return false;
};

const base = e =>
  Math.max(
    2,
    Math.min(
      parseInt(e.target.value || 2, 10),
      36
    )
  );

class Radix extends React.PureComponent {

  state = {
    from: 10,
    number: 100,
    to: 2
  };

  handleFromChange = e => {
    this.setState({
      from: base(e)
    });
  }

  handleNumberChange = e => {
    this.setState({
      number: parseInt(e.target.value || 0, 10)
    });
  }

  handleToChange = e => {
    this.setState({
      to: base(e)
    });
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography
          children="Radix Conversion"
          gutterBottom
          variant="headline"
        />
        <p children="Convert between bases with this simple radix conversion tool." />
        <form
          action="/electron-transitions"
          className={this.props.classes.form}
          method="get"
          onSubmit={handleFormSubmit}
        >
          Convert the number
          <input
            className={this.props.classes.input}
            onChange={this.handleNumberChange}
            min={0}
            type="number"
            value={this.state.number}
          />
          from base
          <input
            className={this.props.classes.input}
            onChange={this.handleFromChange}
            max={36}
            min={2}
            type="number"
            value={this.state.from}
          />
          to base
          <input
            className={this.props.classes.input}
            onChange={this.handleToChange}
            max={36}
            min={2}
            type="number"
            value={this.state.to}
          />
        </form>
        <p>
          <strong>
            {this.state.number}
            <sub children={this.state.from} />
          </strong>{' '}
          is equal to{' '}
          <strong>
            {parseInt(this.state.number, this.state.from).toString(this.state.to).toUpperCase()}
            <sub children={this.state.to} />
          </strong>.
        </p>
      </Paper>
    );
  }
}

export default withStyles(Radix);
