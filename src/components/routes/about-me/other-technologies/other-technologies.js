import { Tooltip } from '@material-ui/core';
import React from 'react';
import withStyles from './other-technologies-styles';

const technologies =
  [
    'Apache', 'Chai', 'C++', 'ES6', 'express', 'GitHub', 'Jest', 'SASS',
    'LetsEncrypt', 'Material UI', 'Mocha', 'MySQL', 'nginx', 'PHP', 'Python',
    'React Native', 'SQL Server', 'TravisCI', 'TypeScript', 'Webpack', 'Babel',
    'Redux'
  ]
  .map((technology, index) =>
    [
      technology,
      {
        href:
          'https://github.com/CharlesStover?tab=repositories&q=topic%3A' +
          technology.toLowerCase()
            .replace(/\+/g, 'p')
            .replace(/\s/g, '-'),
        style: {
          backgroundPosition: (index * -64) + 'px 0'
        }
      }
    ]
  )
  .sort(([ a ], [ b ]) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);

class OtherTechnologies extends React.PureComponent {
  render() {
    return technologies.map(([ technology, { href, style } ]) =>
      <Tooltip
        key={technology}
        title={technology}
      >
        <a
          className={this.props.classes.technology}
          href={href}
          rel="nofollow noopener noreferrer"
          style={style}
          target="_blank"
        >
          <span
            children={technology}
            className={this.props.classes.title}
          />
        </a>
      </Tooltip>
    );
  }
}

export default withStyles(OtherTechnologies);
