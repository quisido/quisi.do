import React from 'react';
import GitHubLink from './github-link/github-link';
import Link from './link/portfolio-link';
import MediumLink from './medium-link/medium-link';
import NpmLink from './npm-link/npm-link';
import Popularity from './popularity/popularity';
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
            title="3DS Tetris"
          />
          <GitHubLink
            description="Automated webpage optimization utility that caches, compresses, concatenates, and otherwise optimizes HTML, CSS, JavaScript, and static file content distribution."
            repo="cspage-php"
            title="CSPage"
          />
          <GitHubLink
            description="A 2D platformer engine implemented in the web browser."
            org="GamingMedley"
            repo="platformer-engine"
            title="Platformer Engine"
          />
          <GitHubLink
            description="A tech demo for a browser-based, Pokemon-esque RPG overworld engine that even supports Internet Explorer 6."
            org="GamingMedley"
            repo="rpg-overworld-engine"
            title="RPG Overworld Engine"
          />
          <GitHubLink
            description="A simple shopping list application."
            repo="shopping-list"
            title="Shopping List"
          />
          <GitHubLink
            description="An artistic tribute to the Sonic the Hedgehog franchise."
            org="GamingMedley"
            repo="sonic-the-hedgehog-tribute"
            title="Sonic the Hedgehog Tribute"
          />
          <GitHubLink
            description="Super Mario World engine in JavaScript"
            org="GamingMedley"
            repo="super-mario-world-js"
            title="Super Mario World JS"
          />
          <GitHubLink
            description="Super Mario World engine in Python"
            org="GamingMedley"
            repo="super-mario-world-py"
            title="Super Mario World PY"
          />
          <GitHubLink
            description="Open source JavaScript snippet that scans tabular data, appends arrow links to the header of sortable tables, and binary sorts the table by the data contained in that column when its sort link is clicked."
            repo="table-sort"
            title="Table Sort"
          />
          <GitHubLink
            description="Mark your TF2 Bingo card as stereotypical situations unfold throughout your game!"
            org="GamingMedley"
            repo="tf2-bingo"
            title="Team Fortress 2 Bingo"
          />
        </Section>
        <Section title="NPM Packages">
          <Popularity />
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
            description="Generates a gradient of the colors of the rainbow."
            package="rainbow-gradient"
          />
          <NpmLink
            description="Returns the innerText of a React JSX object."
            package="react-innertext"
          />
          <NpmLink
            description="A React tooltip similar to Material UI's design."
            package="react-mui-tooltip"
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
          <NpmLink
            description="Generates rainbow-colored text in React."
            package="react-rainbow-text"
          />
        </Section>
        <Section title="Projects">
          <Link
            children="Dota 2 HUD Gallery"
            description="View live demonstrations of the Dota 2 HUDs in your browser."
            href="https://dota2.gamingmedley.com/hud_skins/"
          />
          <Link
            children="Electron Transition Calculator"
            description="A simple tool for calculating change during electron transitions."
            internal
            to="/electron-transitions"
          />
          <Link
            children="Meditative Breathing"
            description="A visual representation to guide meditative breathing."
            href="https://charlesstover.github.io/meditative-breathing/"
          />
          <Link
            children="Radix Conversion"
            description="Convert between bases with this simple radix conversion tool."
            internal
            to="/radix"
          />
          <Link
            children="Rainbow Text Generator"
            description="Rainbowify your text."
            internal
            to="/rainbow-text"
          />
          <Link
            children="Secure Password Generator"
            description="Generates a random string for password use."
            internal
            to="/password-generator"
          />
          <Link
            children="Sprite Sheet to GIF Converter"
            description="Convert your sprite sheet files to animated GIFs with this simple online tool."
            internal
            to="/spritesheet2gif"
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
