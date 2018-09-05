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
            description="Play Tetris on your Nintendo 3DS!"
            icon="⬜"
            org="GamingMedley"
            repo="3ds-tetris"
            title="3DS Tetris"
          />
          <Link
            description="Automated webpage optimization utility that caches, compresses, concatenates, and otherwise optimizes HTML, CSS, JavaScript, and static file content distribution."
            icon="⚡"
            repo="cspage-php"
            title="CSPage"
          />
          <Link
            description="A simple tool for calculating change during electron transitions."
            icon="🔬"
            repo="electron-transition-calculator"
            title="Electron Transition Calculator"
          />
          <Link
            description="A visual representation to guide meditative breathing."
            icon="🙏"
            repo="meditative-breathing"
            title="Meditative Breathing"
          />
          <Link
            description="Generates a random string for password use."
            icon="🔒"
            repo="password-generator"
            title="Password Generator"
          />
          <Link
            description="A 2D platformer engine implemented in the web browser."
            icon="🎮"
            org="GamingMedley"
            repo="platformer-engine"
            title="Platformer Engine"
          />
          <Link
            description="Convert between bases with this simple radix conversion tool."
            icon="2️⃣"
            repo="radix"
            title="Radix Conversion"
          />
          <Link
            description="Rainbowify your text."
            icon="🌈"
            repo="rainbow-text"
            title="Rainbow Text Generator"
          />
          <Link
            description="A tech demo for a browser-based, Pokemon-esque RPG overworld engine that even supports Internet Explorer 6."
            icon="🚶"
            org="GamingMedley"
            repo="rpg-overworld-engine"
            title="RPG Overworld Engine"
          />
          <Link
            description="A simple shopping list application."
            icon="📝"
            repo="shopping-list"
            title="Shopping List"
          />
          <Link
            description="An artistic tribute to the Sonic the Hedgehog franchise."
            icon="🐹"
            org="GamingMedley"
            repo="sonic-the-hedgehog-tribute"
            title="Sonic the Hedgehog Tribute"
          />
          <Link
            description="Super Mario World engine in JavaScript"
            icon="🌼"
            org="GamingMedley"
            repo="super-mario-world-js"
            title="Super Mario World JS"
          />
          <Link
            description="Super Mario World engine in Python"
            icon="🍄"
            org="GamingMedley"
            repo="super-mario-world-py"
            title="Super Mario World PY"
          />
          <Link
            description="Open source JavaScript snippet that scans tabular data, appends arrow links to the header of sortable tables, and binary sorts the table by the data contained in that column when its sort link is clicked."
            icon="🔀"
            repo="table-sort"
            title="Table Sort"
          />
          <Link
            description="Mark your TF2 Bingo card as stereotypical situations unfold throughout your game!"
            icon="🎯"
            org="GamingMedley"
            repo="tf2-bingo"
            title="Team Fortress 2 Bingo"
          />
        </List>
      </Paper>
    );
  }
}

export default withStyles(GitHub);
