import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import date from './date';
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
            title="Cache your React event listeners to improve performance."
            date={date(2018, 9, 10)}
            description="React has an intelligent way of saving processing time to boost performance: If a component's props and state have not changed, then the output of render must not have changed either. If React receives an identical function with a different memory address, it will re-render."
            icon="⚡"
            id="14f635a62e15"
          />
          <Link
            title="Fixing Volumes in Docker Toolbox"
            date={date(2018, 9, 6)}
            description="A tutorial on configuring Oracle Virtualbox to have access to your folders."
            icon="🐋"
            id="4ad5ace0e572"
          />
          <Link
            title="How to Make a Graphical News Slider in jQuery"
            date={date(2011, 4, 1)}
            description="The graphical news slider: something used often, everywhere, for everything. This jQuery slider will take images and associated text, put them in a navigation bar, and periodically scroll through the images with slide-in or fade-in effects."
            icon="🐵"
            id="9bb252d35aa3"
          />
          <Link
            title="Creating a Dynamic Vertical Gradient in PHP"
            date={date(2010, 12, 1)}
            description="Gradients are a necessary and simple tool of web design, providing the perfect transition from color to color. Starting at the basics, this tutorial shows how to create dynamic gradients for your templates."
            icon="🌈"
            id="ae855c63e6b3"
          />
          <Link
            title="Boost Your Page Speed: Reduce Parse Time"
            date={date(2010, 12, 1)}
            description={
              <React.Fragment>
                <Typography
                  children="Nine tips to make your website render quickly."
                  className={this.props.classes.subheading}
                  component="span"
                  variant="subheading"
                />
                <span children="This final chapter deals with minimizing the time it takes for the browser to convert the document from markup to visual elements: why you should and how to reduce the number of DOM elements on the page, include the width and height attribute of images, use cookie-free domains, reduce cookie size, place JavaScript at the bottom of the page, place CSS at the top of the page, avoid CSS expressions, remove duplicate JavaScript and CSS, and avoid HTTP 404 errors." />
              </React.Fragment>
            }
            icon="🏃"
            id="d2a380907de5"
          />
          <Link
            title="Boost Your Page Speed: Reduce Server Calls"
            date={date(2010, 11, 1)}
            description={
              <React.Fragment>
                <Typography
                  children="Improve your loading speed by reducing server requests."
                  className={this.props.classes.subheading}
                  component="span"
                  variant="subheading"
                />
                <span children="How is it possible for the client to receive the same amount of information without connecting to a server to get it? This tutorial covers avoiding empty src and href attributes, reducing DNS lookups, using sprite sheets, using GET for Ajax requests, avoiding URL redirects, making JavaScript and CSS external, adding Expires headers (telling the client to cache the document), and making Ajax cacheable." />
              </React.Fragment>
            }
            icon="🚗"
            id="6b7384d38cb"
          />
          <Link
            title="Boost Your Page Speed: Reduce File Size"
            date={date(2010, 11, 1)}
            description={
              <React.Fragment>
                <Typography
                  children="Six tips to reduce your website's size and boost its performance."
                  className={this.props.classes.subheading}
                  component="span"
                  variant="subheading"
                />
                <span children="Anyone who has been in the web design business knows that it is a constant uphill battle. Just learning the markup, stylesheets, and back end isn't enough to make your website compete in today's market of services and applications. Years of experience can provide you with a beautiful, modern website; it can function in all browsers and even pass validation. Satisfied? Unfortunately, you're not done yet. All intended web development professionals need to be well-versed to optimizing speed." />
              </React.Fragment>
            }
            icon="⚡"
            id="470057090c29"
          />
        </List>
      </Paper>
    );
  }
}

export default withStyles(Medium);

/*
<Link
  title="PHP's htmlspecialchars Implemented in JavaScript"
  date={date(2011, 6, 1)}
  description="Certain characters have special significance in HTML, and should be represented by HTML entities if they are to preserve their meanings. This function returns a string with some of these conversions made; the translations made are those most useful for everyday web programming."
  icon="👷"
  id="3da9ac36d481"
/>
<Link
  title="Establishing a Secure Password Generator for Your User Base"
  date={date(2012, 4, 1)}
  description="An Elementary JavaScript Tutorial"
  icon="🔒"
  id="f7c0814b152a"
/>
*/
