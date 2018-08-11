import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import createObjectProp from 'react-object-prop';
import RainbowText from 'react-rainbow-text';
import Generated from './generated/rainbow-text-generated';
import withStyles from './rainbow-text-styles';
import Textarea from './textarea/textarea';

const handleFormSubmit = e => {
  e.preventDefault();
  return false;
};

class RainbowTextGenerator extends React.PureComponent {

  lightnessStyle = createObjectProp();

  state = {
    lightness: 50,
    saturation: 100,
    text: 'This is an example sentence that is the color of the rainbow.'
  };

  handleLightnessChange = e => {
    this.setState({
      lightness: parseInt(e.target.value, 10)
    });
  };

  handleSaturationChange = e => {
    this.setState({
      saturation: parseInt(e.target.value, 10)
    });
  };

  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  render() {
    const lightGray = this.state.lightness * 2.55;
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Rainbow Text Generator"
            gutterBottom
            variant="headline"
          />
          &ldquo;Rainbowify&rdquo; your text with this rainbow text generator.{' '}
          Turn your <em>black and white</em> text into{' '}
          <strong className={this.props.classes.strong}>
            <RainbowText
              children="rainbow-colored text"
              lightness={this.state.lightness / 100}
              saturation={this.state.saturation / 100}
            />
          </strong>!
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Settings"
            gutterBottom
            variant="headline"
          />
          <form
            action="/rainbow-text"
            method="get"
            onSubmit={handleFormSubmit}
          >
            <label className={this.props.classes.label}>
              Saturation:
              <input
                max={100}
                min={0}
                onChange={this.handleSaturationChange}
                type="range"
                value={this.state.saturation}
              />
            </label>
            <label className={this.props.classes.label}>
              Lightness:
              <div className={this.props.classes.lightness}>
                <input
                  className={this.props.classes.lightnessInput}
                  max={100}
                  min={0}
                  onChange={this.handleLightnessChange}
                  type="range"
                  value={this.state.lightness}
                />
                <div
                  children={this.state.lightness + '%'}
                  className={this.props.classes.lightnessBox}
                  style={this.lightnessStyle({
                    backgroundColor: 'rgb(' + lightGray + ', ' + lightGray + ', ' + lightGray + ')'
                  })}
                />
              </div>
            </label>
            <label className={this.props.classes.label}>
              Text to Rainbowify:
              <Textarea
                onChange={this.handleTextChange}
                value={this.state.text}
              />
            </label>
          </form>
        </Paper>
        <Generated
          lightness={this.state.lightness / 100}
          saturation={this.state.saturation / 100}
          text={this.state.text}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(RainbowTextGenerator);
