import { Tooltip } from '@material-ui/core';
import React from 'react';
import withStyles from './other-technologies-styles';

const technologies =
  [
    'Apache', 'Chai', 'C++', 'ES6', 'express', 'GitHub', 'Jest', 'SASS',
    'LetsEncrypt', 'Material UI', 'Mocha', 'MySQL', 'nginx', 'PHP', 'Python',
    'React Native', 'SQL Server', 'Travis CI', 'TypeScript', 'Webpack', 'Babel',
    'Redux'
  ]
  .map((technology, index) =>
    [ technology, index * -64 ]
  )
  .sort(([ a ], [ b ]) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);

class OtherTechnologies extends React.PureComponent {

  _technologyStyles = [];

  technologyStyle(index) {
    if (!this._technologyStyles[index]) {
      this._technologyStyles[index] = {
        backgroundPosition: technologies[index][1] + 'px 0'
      };
    }
    return this._technologyStyles[index];
  }

  render() {
    return technologies.map(([ technology ], index) =>
      <Tooltip
        key={technology}
        title={technology}
      >
        <span
          className={this.props.classes.technology}
          style={this.technologyStyle(index)}
        />
      </Tooltip>
    );
  }
}

export default withStyles(OtherTechnologies);
