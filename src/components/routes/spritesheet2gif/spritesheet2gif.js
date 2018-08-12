import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Gray from './gray/gray';
import withStyles from './spritesheet2gif-styles';

class SpriteSheetToGif extends React.PureComponent {

  dimensionInputProps = createObjectProp();
  durationInputProps = createObjectProp();

  state = {
    dimension: 0,
    direction: 'automatic',
    duration: 40,
    info: false,
    matte: '#202020',
    perFrame: true
  };

  automaticDimensionText(dimension) {
    if (this.state.dimension === 0) {
      return null;
    }
    return <Typography children={'The sprite\'s ' + dimension + ' will be ' + this.state.dimension + 'px.'} />;
  }

  get automaticText() {
    if (this.state.direction !== 'automatic') {
      return null;
    }
    return (
      <ul>
        <li>
          If the sprite sheet is wider than it is tall:
          {this.automaticDimensionText('width')}
          <p>The sprite's height {this.state.dimension === 0 ? 'and width ' : null} will be equal to the height of the sprite sheet.</p>
        </li>
        <li>
          If the sprite sheet is taller than it is wide:
          <p>The sprite's {this.state.dimension === 0 ? 'height and ' : null}width will be equal to the width of the sprite sheet.</p>
          {this.automaticDimensionText('height')}
        </li>
      </ul>
    );
  }

  get dimensionSuffix() {
    if (this.state.direction === 'horizontal') {
      return 'px wide sprites';
    }
    if (this.state.direction === 'vertical') {
      return 'px tall sprites';
    }
    return ' pixels between sprites';
  }

  get dimensionText() {
    if (this.state.dimension === 0) {
      return null;
    }
    return <Typography children="Set the width to 0 for square sprites." />;
  }

  handleDimensionChange = e => {
    this.setState({
      dimension: parseInt(e.target.value || 0, 10)
    });
  };

  handleDirectionChange = e => {
    this.setState({
      direction: e.target.value
    });
  };

  handleDurationChange = e => {
    this.setState({
      duration: parseInt(e.target.value || 1, 10)
    });
  };

  handleFileChange = e => {
    console.log(e);
  };

  handleInfoClick = e => {
    e.preventDefault();
    this.setState(state => ({
      info: !state.info
    }));
    return false;
  };

  handleMatteChange = e => {
    this.setState({
      matte: e.target.value
    });
  };

  handlePerChange = e => {
    this.setState({
      perFrame: e.target.value === 'per frame'
    });
  };

  get horizontalDimensionText() {
    if (
      this.state.dimension === 0 ||
      this.state.direction !== 'horizontal'
    ) {
      return null;
    }
    return <Typography children={'The sprite\'s width will be ' + this.state.dimension + 'px.'} />;
  }

  get horizontalText() {
    if (this.state.direction !== 'horizontal') {
      return null;
    }
    return (
      <Typography
        children={
          'The sprite\'s height ' +
          (
            this.state.dimension === 0 ?
              'and width ' :
              ''
          ) +
          'will be equal to the height of the sprite sheet.'
        }
      />
    );
  }

  get sprite() {
    return null;
  }

  get verticalText() {
    if (this.state.direction !== 'vertical') {
      return null;
    }
    return (
      <Typography
        children={
          'The sprite\'s ' + (
            this.state.dimension === 0 ?
              'height and ' :
              ''
           ) +
           'width will be equal to the width of the sprite sheet.'
        }
      />
    );
  }

  get verticalDimensionText() {
    if (
      this.state.dimension === 0 ||
      this.state.direction !== 'vertical'
    ) {
      return null;
    }
    return <Typography children={'The sprite\'s height will be ' + this.state.dimension + 'px.'} />;
  }

  get info() {
    if (!this.state.info) {
      return null;
    }
    return (
      <React.Fragment>
        <Typography paragraph>
          If your sprite sheet has a <Gray /> background color, you would want to use a <Gray /> matte so that your animation is transparent.
        </Typography>
        <Typography paragraph>
          If your sprite sheet uses a lot of <Gray /> in the foreground, you would not want to use a <Gray /> matte, or else the <Gray /> in the foreground would become transparent. An off-colored but similar alternative, such as <Gray off />, that doesn't appear in the sprite sheet would be a possible solution.
        </Typography>
        <Typography
          children="If your sprite sheet is already transparent, choose a color not present in the image."
          paragraph
        />
        <Typography
          children="For translucent PNG sprite sheets, this is the background color your animated GIF will fade into, as if your PNG were placed on top of this color."
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.about}>
          <div className={this.props.classes.aboutText}>
            <Typography
              children="Sprite Sheet Animator"
              gutterBottom
              variant="headline"
            />
            <Typography children="Convert your sprite sheet files to animated GIFs with this simple online tool. Browse your computer for a GIF, JPEG, or PNG sprite sheet, select the appropriate options for your animation, and click Convert!" />
          </div>
          <div
            children={this.sprite}
            className={this.props.classes.spriteContainer}
          />
        </Paper>
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Convert a Sprite Sheet to an Animated GIF"
            gutterBottom
            variant="headline"
          />
          <table
            cellSpacing={0}
            className={this.props.classes.table}
          >
            <tbody>
              <tr>
                <th children="File:" />
                <td>
                  <input
                    onChange={this.handleFileChange}
                    type="file"
                  />
                </td>
              </tr>
              <tr>
                <th children="Duration:" />
                <td>
                  <TextField
                    className={this.props.classes.duration}
                    inputProps={this.durationInputProps({
                      min: 1
                    })}
                    onChange={this.handleDurationChange}
                    required
                    type="number"
                    value={this.state.duration}
                  />{' '}
                  milliseconds{' '}
                  <TextField
                    onChange={this.handlePerChange}
                    required
                    select
                    value={this.state.per ? 'per frame' : 'total'}
                  >
                    <MenuItem
                      children="per frame"
                      value="per frame"
                    />
                    <MenuItem
                      children="total"
                      value="total"
                    />
                  </TextField>
                </td>
              </tr>
              <tr>
                <th children="Matte:" />
                <td>
                  <input
                    className={this.props.classes.matte}
                    onChange={this.handleMatteChange}
                    required
                    type="color"
                    value={this.state.matte}
                  />
                  <Typography
                    children="The matte color for the image will be transparent in the animated GIF."
                    paragraph
                  />
                  <Typography paragraph={this.state.info}>
                    <a
                      children={this.state.info ? '- Less Info' : '+ More Info'}
                      href="#"
                      onClick={this.handleInfoClick}
                    />
                  </Typography>
                  {this.info}
                </td>
              </tr>
              <tr>
                <th children="Sprites:" />
                <td>
                  Tile{' '}
                  <TextField
                    onChange={this.handleDirectionChange}
                    required
                    select
                    value={this.state.direction}
                  >
                    <MenuItem
                      children="automatically"
                      value="automatic"
                    />
                    <MenuItem
                      children="horizontally"
                      value="horizontal"
                    />
                    <MenuItem
                      children="vertically"
                      value="vertical"
                    />
                  </TextField>{' '}
                  with{' '}
                  <TextField
                    className={this.props.classes.dimension}
                    inputProps={this.dimensionInputProps({
                      min: 0
                    })}
                    onChange={this.handleDimensionChange}
                    required
                    type="number"
                    value={this.state.dimension}
                  />
                  {this.dimensionSuffix}
                  {this.automaticText}
                  {this.horizontalDimensionText}
                  {this.horizontalText}
                  {this.verticalText}
                  {this.verticalDimensionText}
                  {this.dimensionText}
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(SpriteSheetToGif);
