import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from './donate-styles';

class Donate extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography className={this.props.classes.paragraph}>
          You might have found one of my{' '}
          <Link
            title="Charles Stover's Portfolio"
            to="/portfolio/"
          >
            free web apps
          </Link>{' '}
          useful. If so, you can use the form on this page to make a small donation with{' '}
          <a
            href="https://www.paypal.com/webapps/mpp/paypal-popup"
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="How PayPal Works"
          >
            PayPal
          </a>.{' '}
          Your donation will help cover the hosting and miscellaneous fees required to keep this website operational.
        </Typography>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          className={this.props.classes.form}
          method="post"
          target="_top"
        >
          <input type="hidden" name="bn" value="PP-BuyNowBF:btn_paynow_LG.gif:NonHosted" />
          <input type="hidden" name="business" value="YJARGQ797ECXN" />
          <input type="hidden" name="button_subtype" value="services" />
          <input type="hidden" name="cancel_return" value="https://charlesstover.com/donate/cancel" />
          <input type="hidden" name="cmd" value="_xclick" />
          <input type="hidden" name="cn" value="Include instructions:" />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="hidden" name="item_name" value="Donation" />
          <input type="hidden" name="item_number" value="Donation" />
          <input type="hidden" name="lc" value="US" />
          <input type="hidden" name="no_note" value="0" />
          <input type="hidden" name="no_shipping" value="1" />
          <input type="hidden" name="return" value="https://charlesstover.com/donate/success" />
          <input type="hidden" name="rm" value="1" />
          <input type="hidden" name="shipping" value="0.00" />
          <input type="hidden" name="tax_rate" value="0.000" />
          <div className={this.props.classes.amount}>
            <span>$</span>
            <TextField
              className={this.props.classes.textField}
              name="amount"
              type="text"
              value="10.00"
            />
          </div>
          <Button
            name="submit"
            type="submit"
            variant="contained"
          >
            Donate
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(Donate);
