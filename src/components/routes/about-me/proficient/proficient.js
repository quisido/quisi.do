import React from 'react';
import Icon from '../icon/icon';
import withStyles from './proficient-styles';

/*
const github = technology =>
  'https://github.com/CharlesStover?tab=repositories&q=topic%3A' +
    technology.toLowerCase()
      .replace(/\+/g, 'p')
      .replace(/\s/g, '-');
*/

const proficiencies = [
  'Babel', 'Chai', 'Enzyme', 'ES6', 'express', 'GitHub', 'Jest', 'Material UI',
  'Mocha', 'MySQL', 'nginx', 'React Native', 'Redux', 'SASS', 'SQL Server',
  'TravisCI', 'TypeScript', 'Webpack'
];

class Proficient extends React.PureComponent {
  render() {
    return (
      <div
        children={proficiencies.map((technology, index) =>
          <Icon
            children={technology}
            className={this.props.classes.proficiency}
            index={index}
            key={technology}
            tooltip={technology}
          />
        )}
        className={this.props.classes.root}
      />
    );
  }
}

export default withStyles(Proficient);
