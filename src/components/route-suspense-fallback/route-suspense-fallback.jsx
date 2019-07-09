import React from 'react';
import Spinner from '../spinner';
import withStyles, { ANIMATION_DURATION } from './route-suspense-fallback-styles';

const phrases = [
  'Allocating resources',
  'Assembling Tron',
  'Bolting the bird',
  'Capturing the last Metroid',
  'Casting a spell',
  'Channelling Fireball',
  'Drawing for turn',
  // 'Earning fifteen silver points',
  // 'Holding up Cryptic mana',
  'Loading',
  'Playing a land',
  'Restoring peace to the galaxy',
  'Rolling the planar die',
  'Sacrificing creatures',
  'Saving the princess',
  'Summoning Lavos',
  'Tapping lands',
  'Untapping permanents',
];

export default withStyles(
  function RouteSuspenseFallback({ classes }) {
    const phrase = `${phrases[Math.floor(Math.random() * phrases.length)]}...`;
    const phraseLength = phrase.length;
    const letters = phrase.split('');
    return (
      <div
        aria-busy
        className={classes.root}
        role="alert"
      >
        <Spinner
          className={classes.spinner}
          size={1.5}
        />
        {letters.map((letter, index) => {
          const animationDelay = index / phraseLength * ANIMATION_DURATION;
          return (
            <span
              className={classes.letter}
              key={index}
              style={{
                animationDelay: `${animationDelay}s`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  }
);
