import { Button, CircularProgress, List, ListItem, ListItemText, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Gray from './gray/gray';
import withStyles from './spritesheet2gif-styles';

const DEVELOPER_ERRORS = new Set([
  'Failed to fetch',
  'Unexpected token < in JSON at position 0',
])

class SpriteSheetToGif extends React.PureComponent {

  dimensionInputProps = createObjectProp();
  durationInputProps = createObjectProp();
  selectClasses = createObjectProp();
  selectProps = createObjectProp();

  state = {
    dimension: 0,
    direction: 'automatic',
    duration: 40,
    error: null,
    info: false,
    loading: false,
    matte: '#202020',
    perFrame: true,
    sheet: null,
    sprite: null
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
      <>
        <ListItem>
          <ListItemText>
            <Typography children="If the sprite sheet is wider than it is tall:" />
            {this.automaticDimensionText('width')}
            <Typography>
              The sprite's height {this.state.dimension === 0 ? 'and width ' : null} will be equal to the height of the sprite sheet.
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography children="If the sprite sheet is taller than it is wide:" />
            <Typography>
              The sprite's {this.state.dimension === 0 ? 'height and ' : null}width will be equal to the width of the sprite sheet.
            </Typography>
            {this.automaticDimensionText('height')}
          </ListItemText>
        </ListItem>
      </>
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
    return (
      <ListItem>
        <ListItemText>
          <Typography children="Set the width to 0 for square sprites." />
        </ListItemText>
      </ListItem>
    );
  }

  handleCloseErrorClick = e => {
    this.setState({
      error: null
    });
  };

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
    this.setState({
      sheet: e.target.files[0]
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    let loading = true;
    this.setState(() => ({ loading }));
    const body = new FormData();
    body.append('dimension', this.state.dimension);
    body.append('direction', this.state.direction);
    body.append('duration', this.state.duration);
    body.append('matte', this.state.matte);
    body.append('perFrame', this.state.perFrame);
    body.append('sheet', this.state.sheet);
    fetch('https://api.charlesstover.com/spritesheet2gif', {
      body,
      cache: 'no-cache',
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer'
    })
      .then(response => response.json())
      .then(response => {
        if (response.message) {
          throw new Error(response.message);
        }
        loading = false;
        this.setState({
          error: null,
          loading,
          sprite: response
        });
      })
      .catch(err => {
        loading = false;
        this.setState({
          error: err.message,
          loading,
          sprite: null
        })
      });
    return false;
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
    return (
      <ListItem>
        <ListItemText>
          <Typography children={'The sprite\'s width will be ' + this.state.dimension + 'px.'} />
        </ListItemText>
      </ListItem>
    );
  }

  get horizontalText() {
    if (this.state.direction !== 'horizontal') {
      return null;
    }
    const andWidth =
      this.state.dimension === 0 ?
        'and width ' :
        '';
    return (
      <ListItem>
        <ListItemText>
          <Typography children={'The sprite\'s height ' + andWidth + 'will be equal to the height of the sprite sheet.'} />
        </ListItemText>
      </ListItem>
    );
  }

  get info() {
    if (!this.state.info) {
      return null;
    }
    return (
      <>
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
      </>
    );
  }

  get sheetName() {
    if (this.state.sheet) {
      return this.state.sheet.name;
    }
    return null;
  }

  get sprite() {
    if (this.state.error) {
      return (
        <Paper className={this.props.classes.paper}>
          <div
            children="❌"
            className={this.props.classes.close}
            onClick={this.handleCloseErrorClick}
          />
          <strong>An Error Occurred:</strong>{' '}
          {this.state.error}
          {
            DEVELOPER_ERRORS.has(this.state.error)
            ? <p className={this.props.classes.report}>
                You may report this error to the developer on{' '}
                <a
                  href="https://twitter.com/CharlesStover"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  title="Charles Stover (@CharlesStover) / Twitter"
                >
                  Twitter
                </a>{' '}
                or by{' '}
                <a
                  href="mailto:spritesheet2gif@charlesstover.com"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  title="Email Charles Stover"
                >
                  email
                </a>.
              </p>
            : null
          }
        </Paper>
      );
    }
    if (this.state.sprite) {
      return (
        <Paper
          className={
            this.props.classes.paper + ' ' +
            this.props.classes.sprite
          }
        >
          <img
            alt="Animated GIF"
            height={this.state.sprite.height}
            src={this.state.sprite.image}
            width={this.state.sprite.width}
          />
        </Paper>
      );
    }
    return null;
  }

  get spriteDemo() {
    if (this.state.error) {
      return this.spriteDemoError;
    }
    return {
      className: this.props.classes.spriteDemo,
      height: 73, 
      src: 'https://i.imgur.com/MyiRdgH.gif',
      width: 85
    };
  }

  get spriteDemoError() {
    return {
      className: this.props.classes.spriteDemoError,
      height: 180,
      src: 'https://i.imgur.com/5anJv4t.gif',
      width: 180
    };
  }

  get tfoot() {
    if (this.state.loading) {
      return <CircularProgress color="primary" />;
    }
    return (
      <Button
        children="Convert"
        color="primary"
        disabled={this.state.disabled}
        type="submit"
        variant="contained"
      />
    );
  }

  get verticalText() {
    if (this.state.direction !== 'vertical') {
      return null;
    }
    const heightAnd =
      this.state.dimension === 0 ?
        'height and ' :
        '';
    return (
      <ListItem>
        <ListItemText>
          <Typography children={'The sprite\'s ' + heightAnd + 'width will be equal to the width of the sprite sheet.'} />
        </ListItemText>
      </ListItem>
    );
  }

  get verticalDimensionText() {
    if (
      this.state.dimension === 0 ||
      this.state.direction !== 'vertical'
    ) {
      return null;
    }
    return (
      <ListItem>
        <ListItemText>
          <Typography children={'The sprite\'s height will be ' + this.state.dimension + 'px.'} />
        </ListItemText>
      </ListItem>
    );
  }

  render() {
    const selectProps = this.selectProps({
      classes: this.selectClasses({
        select: this.props.classes.select
      })
    });
    return (
      <>
        <Paper className={this.props.classes.paper + ' ' + this.props.classes.about}>
          <div className={this.props.classes.aboutText}>
            <Typography
              children="Sprite Sheet Animator"
              gutterBottom
              variant="h5"
            />
            <Typography children="Convert your sprite sheet files to animated GIFs with this simple online tool. Browse your computer for a GIF, JPEG, or PNG sprite sheet, select the appropriate options for your animation, and click Convert!" />
          </div>
          <div className={this.props.classes.spriteDemoContainer}>
            <img
              alt="Animated Sprite Demo"
              {...this.spriteDemo}
            />
          </div>
        </Paper>
        {this.sprite}
        <Paper className={this.props.classes.paper}>
          <Typography
            children="Convert a Sprite Sheet to an Animated GIF"
            gutterBottom
            variant="h5"
          />
          <form
            onSubmit={this.handleFormSubmit}
            method="POST"
          >
            <table
              cellSpacing={0}
              className={this.props.classes.table}
            >
              <tbody>
                <tr>
                  <th children="File:" />
                  <td>
                    <label>
                      <input
                        accept="image/*"
                        className={this.props.classes.file}
                        multiple
                        onChange={this.handleFileChange}
                        required
                        type="file"
                      />
                      <Button
                        children="Upload"
                        className={this.props.classes.upload}
                        component="span"
                        variant="contained"
                      />
                    </label>
                    {this.sheetName}
                  </td>
                </tr>
                <tr>
                  <th children="Duration:" />
                  <td>
                    <TextField
                      className={this.props.classes.duration}
                      error={!!this.state.error}
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
                      error={!!this.state.error}
                      onChange={this.handlePerChange}
                      required
                      select
                      SelectProps={selectProps}
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
                        href="/spritesheet2gif"
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
                      error={!!this.state.error}
                      onChange={this.handleDirectionChange}
                      required
                      select
                      SelectProps={selectProps}
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
                      error={!!this.state.error}
                      inputProps={this.dimensionInputProps({
                        min: 0
                      })}
                      onChange={this.handleDimensionChange}
                      required
                      type="number"
                      value={this.state.dimension}
                    />
                    {this.dimensionSuffix}
                    <List className={this.props.classes.tileText}>
                      {this.automaticText}
                      {this.horizontalDimensionText}
                      {this.horizontalText}
                      {this.verticalText}
                      {this.verticalDimensionText}
                      {this.dimensionText}
                    </List>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    children={this.tfoot}
                    className={this.props.classes.tfoot}
                    colSpan={2}
                  />
                </tr>
              </tfoot>
            </table>
          </form>
        </Paper>
      </>
    );
  }
}

export default withStyles(SpriteSheetToGif);
