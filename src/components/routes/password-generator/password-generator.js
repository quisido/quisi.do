import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import withStyles from './password-generator-styles';

const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()_-+=[{]}|;:,.<>/?";
const CHARACTERS_LENGTH = CHARACTERS.length;

class PasswordGenerator extends React.PureComponent {

  state = {
    length: 32
  };

  handleLengthChange = e => {
    this.setState({
      length: parseInt(e.target.value || 1, 10)
    });
  };

  get password() {
    let password = '';
    for (let x = 0; x < this.state.length; x++) {
      password += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
    }
    return password;
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography
          children="Secure Password Generator"
          gutterBottom
          variant="headline"
        />
        <Typography children="This secure password generator will output a randomized, symbol-inclusive string of characters for you to use when setting an account password. You may specify a custom length. If JavaScript is enabled in your browser, the new password will be generated on-the-fly. Otherwise, it will be generated after a form submission or any time you reload the page." />
        <table className={this.props.classes.table}>
          <tbody>
            <tr>
              <th
                children="Length:"
                className={this.props.classes.th}
              />
              <td>
                <input
                  className={this.props.classes.input + ' ' + this.props.classes.length}
                  min={1}
                  onChange={this.handleLengthChange}
                  type="number"
                  value={this.state.length}
                />{' '}
                characters
              </td>
            </tr>
            <tr>
              <th
                children="Password:"
                className={this.props.classes.th}
              />
              <td>
                <input
                  className={this.props.classes.input + ' ' + this.props.classes.password}
                  readOnly
                  type="text"
                  value={this.password}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    )
  }
}

export default withStyles(PasswordGenerator);
