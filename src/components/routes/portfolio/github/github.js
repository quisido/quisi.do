import { List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import withStyles from './github-styles';
import Link from './link/github-link';

export class GitHub extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography
          children="GitHub Repositories"
          className={this.props.classes.title}
          variant="headline"
        />
        <List className={this.props.classes.list}>
          <Link
            repo="3ds-tetris"
            org="GamingMedley"
            title="3DS Tetris"
            description="Play Tetris on your Nintendo 3DS!"
            icon="⬜"
          />
          <Link
            repo="cspage-php"
            title="CSPage"
            description="Automated webpage optimization utility that caches, compresses, concatenates, and otherwise optimizes HTML, CSS, JavaScript, and static file content distribution."
            icon="⚡"
          />
          <Link
            repo="electron-transition-calculator"
            title="Electron Transition Calculator"
            description="A simple tool for calculating change during electron transitions."
            icon="🔬"
          />
          <Link
            repo="meditative-breathing"
            title="Meditative Breathing"
            description="A visual representation to guide meditative breathing."
            icon="🙏"
          />
          <Link
            repo="password-generator"
            title="Password Generator"
            description="Generates a random string for password use."
            icon="🔒"
          />
          <Link
            repo="platformer-engine"
            org="GamingMedley"
            title="Platformer Engine"
            description="A 2D platformer engine implemented in the web browser."
            icon="🎮"
          />
          <Link
            repo="radix"
            title="Radix Conversion"
            description="Convert between bases with this simple radix conversion tool."
            icon="2️⃣"
          />
          <Link
            repo="rainbow-text"
            title="Rainbow Text Generator"
            description="Rainbowify your text."
            icon="🌈"
          />
          <Link
            repo="rpg-overworld-engine"
            org="GamingMedley"
            title="RPG Overworld Engine"
            description="A tech demo for a browser-based, Pokemon-esque RPG overworld engine that even supports Internet Explorer 6."
            icon="🚶"
          />
          <Link
            repo="shopping-list"
            title="Shopping List"
            description="A simple shopping list application."
            icon="📝"
          />
          <Link
            repo="sonic-the-hedgehog-tribute"
            org="GamingMedley"
            title="Sonic the Hedgehog Tribute"
            description="An artistic tribute to the Sonic the Hedgehog franchise."
            icon="🐹"
          />
          <Link
            repo="super-mario-world-js"
            org="GamingMedley"
            title="Super Mario World JS"
            description="Super Mario World engine in JavaScript"
            icon="🌼"
          />
          <Link
            repo="super-mario-world-py"
            org="GamingMedley"
            title="Super Mario World PY"
            description="Super Mario World engine in Python"
            icon="🍄"
          />
          <Link
            repo="table-sort"
            title="Table Sort"
            description="Open source JavaScript snippet that scans tabular data, appends arrow links to the header of sortable tables, and binary sorts the table by the data contained in that column when its sort link is clicked."
            icon="🔀"
          />
          <Link
            repo="tf2-bingo"
            org="GamingMedley"
            title="Team Fortress 2 Bingo"
            description="Mark your TF2 Bingo card as stereotypical situations unfold throughout your game!"
            icon="🎯"
          />
        </List>
      </Paper>
    );
  }
}

export default withStyles(GitHub);
