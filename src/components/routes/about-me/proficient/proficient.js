import React from 'react';
import Icon from '../icon/icon';
import withStyles from './proficient-styles';

const proficiencies = [
  'Babel', 'Chai', 'Enzyme', 'ES6', 'express', 'GitHub', 'Jest', 'Material UI',
  'Mocha', 'MySQL', 'nginx', 'React Native', 'Redux', 'SASS', 'SQL Server',
  'TravisCI', 'TypeScript', 'Webpack'
];

export default withStyles(
  function Proficient({ classes }) {
    return (
      <div className={classes.root}>
        {proficiencies.map((technology, index) =>
          <Icon
            className={classes.proficiency}
            index={index}
            key={technology}
            tooltip={technology}
          >
            {technology}
          </Icon>
        )}
      </div>
    );
  }
);
