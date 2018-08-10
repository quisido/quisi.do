import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import withStyles from './electron-transitions-styles';

const handleFormSubmit = e => {
  e.preventDefault();
  return false;
};

class ElectronTransitions extends React.PureComponent {

  state = {
    from: 2,
    to: 1
  };

  get deltaE() {
    return -2.178e-18 * (1 / Math.pow(this.state.to, 2) - 1 / Math.pow(this.state.from, 2));
  }

  handleFromChange = e => {
    this.setState({
      from: parseInt(e.target.value || 1, 10)
    });
  }

  handleToChange = e => {
    this.setState({
      to: parseInt(e.target.value || 1, 10)
    });
  }

  get lambda() {
    return Math.abs(1.9864458e-25 / this.deltaE);
  }

  get nu() {
    return Math.abs(this.deltaE / 6.62607004e-34);
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Electron Transition Calculator"
            gutterBottom
            variant="headline"
          />
          <form
            action="/electron-transitions"
            className={this.props.classes.body + ' ' + this.props.classes.form}
            method="get"
            onSubmit={handleFormSubmit}
          >
            From{' '}
            <strong>
              n ={' '}
              <input
                className={this.props.classes.input}
                min={1}
                onChange={this.handleFromChange}
                type="number"
                value={this.state.from}
              />
            </strong>{' '}
            to{' '}
            <strong>
              n ={' '}
              <input
                className={this.props.classes.input}
                min={1}
                onChange={this.handleToChange}
                type="number"
                value={this.state.to}
              />
            </strong>
          </form>
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Solutions & Equations"
            gutterBottom
            variant="headline"
          />
          <div className={this.props.classes.body}>
            <table className={this.props.classes.table}>
              <tbody>
                <tr>
                  <th>
                    Change in Energy (&Delta;E):
                  </th>
                  <td>
                    {this.deltaE}{' '}
                    <abbr
                      children="J"
                      title="Joules"
                    />
                  </td>
                  <td>
                    -2.178&times;10
                    <sup children={-18} />{' '}
                    &times;{' '}
                    (
                      1&divide;
                      <strong children={this.state.to} />
                      <sup children={2} />{' '}
                      &minus;{' '}
                      1&divide;
                      <strong children={this.state.from} />
                      <sup children={2} />
                    )
                  </td>
                </tr>
                <tr>
                  <th>
                    Frequency (&nu;):
                  </th>
                  <td>
                    {this.nu}{' '}
                    <abbr
                      children="Hz"
                      title="Hertz"
                    />
                  </td>
                  <td>
                    <strong>
                      <abbr
                        children={this.deltaE}
                        title="Change in Energy"
                      />
                    </strong> &divide;{' '}
                    <abbr title="Planck's Constant">
                      6.626&times;10
                      <sup children={-34} />
                    </abbr>
                  </td>
                </tr>
                <tr>
                  <th>
                    Wavelength (&lambda;):
                  </th>
                  <td>
                    {this.lambda}{' '}
                    <abbr
                      children="m"
                      title="meters"
                    />
                  </td>
                  <td>
                    <abbr title="Planck's Constant">
                      6.626&times;10
                      <sup>-34</sup>
                    </abbr> &times;{' '}
                    <abbr title="Speed of Light">
                      3&times;10
                      <sup>8</sup>
                    </abbr> &divide;{' '}
                    <strong>
                      <abbr
                        children={this.deltaE}
                        title="Change in Energy">
                      </abbr>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Constants for Reference"
            gutterBottom
            variant="headline"
          />
          <div className={this.props.classes.body}>
            <table className={this.props.classes.table}>
              <tbody>
                <tr>
                  <th children="Planck's Constant:" />
                  <td>
                    6.626 &times; 10
                    <sup>-34</sup>
                  </td>
                </tr>
                <tr>
                  <th children="Speed of Light:" />
                  <td>
                    3 &times; 10
                    <sup>8</sup>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Paper>
      </React.Fragment> 
    );
  }
}

export default withStyles(ElectronTransitions);
