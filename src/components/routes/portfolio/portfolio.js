import React from 'react';
import GitHubLink from './github-link/github-link';
import MediumLink from './medium-link/medium-link';
import NpmLink from './npm-link/npm-link';
import Section from './section/portfolio-section';

class Portfolio extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Section title="GitHub">
          <GitHubLink
            description="Play Tetris on your Nintendo 3DS!"
            org="GamingMedley"
            repo="3ds-tetris"
          />
          <GitHubLink
            description="Automated webpage optimization utility that caches, compresses, concatenates, and otherwise optimizes HTML, CSS, JavaScript, and static file content distribution."
            repo="cspage-php"
          />
          <GitHubLink
            description="A 2D platformer engine implemented in the web browser."
            org="GamingMedley"
            repo="platformer-engine"
          />
          <GitHubLink
            description="A tech demo for a browser-based, Pokemon-esque RPG overworld engine that even supports Internet Explorer 6."
            org="GamingMedley"
            repo="rpg-overworld-engine"
          />
          <GitHubLink
            description="A simple shopping list application."
            repo="shopping-list"
          />
          <GitHubLink
            description="An artistic tribute to the Sonic the Hedgehog franchise."
            org="GamingMedley"
            repo="sonic-the-hedgehog-tribute"
          />
          <GitHubLink
            description="Super Mario World engine in JavaScript"
            org="GamingMedley"
            repo="super-mario-world-js"
          />
          <GitHubLink
            description="Super Mario World engine in Python"
            org="GamingMedley"
            repo="super-mario-world-py"
          />
          <GitHubLink
            description="Open source JavaScript snippet that scans tabular data, appends arrow links to the header of sortable tables, and binary sorts the table by the data contained in that column when its sort link is clicked."
            repo="table-sort"
          />
          <GitHubLink
            description="Mark your TF2 Bingo card as stereotypical situations unfold throughout your game!"
            org="GamingMedley"
            repo="tf2-bingo"
          />
        </Section>
        <Section title="NPM Packages">
          <NpmLink
            description="Convert HSL to RGB."
            package="@charlesstover/hsl2rgb"
          />
          <NpmLink
            description="Allows web developers to implement the Konami code on their webpages."
            package="@gamingmedley/konami.js"
          />
          <NpmLink
            description="Places delimiters between items in an array."
            package="delimiter"
          />
          <NpmLink
            description="Fetches using standardized, four-part asynchronous actions for redux-thunk."
            package="fetch-action-creator"
          />
          <NpmLink
            description="Dynamically build Microsoft SQL Server queries using JavaScript."
            package="mssql-query-builder"
          />
          <NpmLink
            description="Returns the innerText of a React JSX object."
            package="react-innertext"
          />
          <NpmLink
            description="Manage multiple contexts with a single React component."
            package="react-multi-context"
          />
          <NpmLink
            description="Caches Object props in React so as to prevent unnecessary re-rendering."
            package="react-object-prop"
          />
          <NpmLink
            description="A sleek portfolio design created in React."
            package="react-portfolio"
          />
          <NpmLink
            description="A quotes carousel for React."
            package="react-quotes"
          />
        </Section>
        <Section title="Publications">
          <MediumLink
            id="470057090c29"
            title="Boost Your Page Speed: Reduce File Size"
          />
          <MediumLink
            id="d2a380907de5"
            title="Boost Your Page Speed: Reduce Parse Time"
          />
          <MediumLink
            id="6b7384d38cb"
            title="Boost Your Page Speed: Reduce Server Calls"
          />
          <MediumLink
            id="ae855c63e6b3"
            title="Creating a Dynamic Vertical Gradient in PHP"
          />
          <MediumLink
            id="f7c0814b152a"
            title="Establishing a Secure Password Generator for Your User Base"
          />
          <MediumLink
            id="9bb252d35aa3"
            title="How to Make a Graphical News Slider in jQuery"
          />
          <MediumLink
            id="3da9ac36d481"
            title="PHP's htmlspecialchars Implemented in JavaScript"
          />
        </Section>
      </React.Fragment> 
    );
  }
}

export default Portfolio;
