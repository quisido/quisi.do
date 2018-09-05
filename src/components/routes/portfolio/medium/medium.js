import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Link from './link/medium-link';
import withStyles from './medium-styles';

class Medium extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography
          children="Medium Publications"
          className={this.props.classes.title}
          variant="headline"
        />
        <List className={this.props.classes.list}>
          <Link
            description="Anyone who has been in the web design business knows that it is a constant uphill battle. Just learning the markup, stylesheets, and back end isn't enough to make your website compete in today's market of services and applications. Years of experience can provide you with a beautiful, modern website; it can function in all browsers and even pass validation. Satisfied? Unfortunately, you're not done yet. All intended web development professionals need to be well-versed to optimizing speed."
            icon="⚡"
            id="470057090c29"
            title="Boost Your Page Speed: Reduce File Size"
          />
          <Link
            description="This final chapter deals with minimizing the time it takes for the browser to convert the document from markup to visual elements: why you should and how to reduce the number of DOM elements on the page, include the width and height attribute of images, use cookie-free domains, reduce cookie size, place JavaScript at the bottom of the page, place CSS at the top of the page, avoid CSS expressions, remove duplicate JavaScript and CSS, and avoid HTTP 404 errors."
            icon="🏃"
            id="d2a380907de5"
            title="Boost Your Page Speed: Reduce Parse Time"
          />
          <Link
            description="How is it possible for the client to receive the same amount of information without connecting to a server to get it? This tutorial covers avoiding empty src and href attributes, reducing DNS lookups, using sprite sheets, using GET for Ajax requests, avoiding URL redirects, making JavaScript and CSS external, adding Expires headers (telling the client to cache the document), and making Ajax cacheable."
            icon="🚗"
            id="6b7384d38cb"
            title="Boost Your Page Speed: Reduce Server Calls"
          />
          <Link
            description=""
            icon="🌈"
            id="ae855c63e6b3"
            title="Creating a Dynamic Vertical Gradient in PHP"
          />
          <Link
            description=""
            icon="🔒"
            id="f7c0814b152a"
            title="Establishing a Secure Password Generator for Your User Base"
          />
          <Link
            description="The graphical news slider: something used often, everywhere, for everything. This jQuery slider will take images and associated text, put them in a navigation bar, and periodically scroll through the images with slide-in or fade-in effects."
            icon="🐵"
            id="9bb252d35aa3"
            title="How to Make a Graphical News Slider in jQuery"
          />
          <Link
            description=""
            icon="👷"
            id="3da9ac36d481"
            title="PHP's htmlspecialchars Implemented in JavaScript"
          />
        </List>
      </Paper>
    );
  }
}

export default withStyles(Medium);
