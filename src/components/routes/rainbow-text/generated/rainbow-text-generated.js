import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import memoizeOne from 'memoize-one';
import rainbowGradient from 'rainbow-gradient';
import React from 'react';
import RainbowText from 'react-rainbow-text';
import rgb2hex from '../constants/rgb2hex';
import Textarea from '../textarea/textarea';
import withStyles from './rainbow-text-generated-styles';

const bbCode = (characters, gradient) => {
  let whitespace = 0;
  return characters.reduce(
    (bbCode, char, index) => {
      if (char === ' ') {
        whitespace++;
        return bbCode + ' ';
      }
      return bbCode + (
        '[color=' + rgb2hex(...gradient[index - whitespace]) + ']' +
        char +
        '[/color]'
      );
    },
    ''
  );
};

const htmlEntities = (characters, gradient) => {
  let whitespace = 0;
  return characters.reduce(
    (bbCode, char, index) => {
      if (char === ' ') {
        whitespace++;
        return bbCode + ' ';
      }
      return bbCode + (
        '<span style="color:' + rgb2hex(...gradient[index - whitespace]) + '">' +
        char +
        '</span>'
      );
    },
    ''
  );
};

class RainbowTextGenerated extends React.PureComponent {

  _bbCode = memoizeOne(bbCode);
  _characters = memoizeOne(str => str.split(''));
  _gradient = memoizeOne(rainbowGradient);
  _gradientSize = memoizeOne(str => str.replace(/\s+/g, '').length);
  _htmlEntities = memoizeOne(htmlEntities);

  get bbCode() {
    return this._bbCode(this.characters, this.gradient);
  }

  get characters() {
    return this._characters(this.props.text);
  }

  get gradient() {
    return this._gradient(this.gradientSize, this.props.saturation, this.props.lightness);
  }

  get gradientSize() {
    return this._gradientSize(this.props.text);
  }

  get htmlEntities() {
    return this._htmlEntities(this.characters, this.gradient);
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography
          children="Your Rainbow Text"
          gutterBottom
          variant="headline"
        />
        <blockquote
          className={
            this.props.classes.blockquote + ' ' +
            (
              this.props.lightness < 0.5 ?
                this.props.classes.light :
                this.props.classes.dark
            )
          }
        >
          <RainbowText
            children={this.props.text}
            lightness={this.props.lightness}
            saturation={this.props.saturation}
          />
        </blockquote>
        <Typography
          children="HTML:"
          className={this.props.classes.title}
          gutterBottom
          variant="title"
        />
        <Textarea value={this.htmlEntities} />
        <Typography
          className={this.props.classes.title}
          gutterBottom
          variant="title"
        >
          <abbr
            children="BB"
            title="Bulletin Board"
          />{' '}
          Code:
        </Typography>
        <Textarea value={this.bbCode} />
      </Paper>
    );
  }
}

export default withStyles(RainbowTextGenerated);
