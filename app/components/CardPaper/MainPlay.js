import React from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';
import FullScreenIcon from '@material-ui/icons/Fullscreen';
import PictureIcon from '@material-ui/icons/PictureInPictureAlt';
import styles from './cardStyle-jss';
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

class MainPlay extends React.Component {
  state = {
    url: 'https://www.youtube.com/watch?v=VT_cDEg2gN4',
    pip: false,
    playing: false,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    expanded: false
  };

  handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  togglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  ref = player => {
    this.player = player
  }

  render() {
    const {
      classes,
      theme,
      title,
      artist,
      cover,
    } = this.props;

    const {
      url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip
    } = this.state;

    return (
        <div className={classes.details}>
          <ReactPlayer
              ref={this.ref}
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
            />
          <div className={classes.controls}>
            <IconButton aria-label="Play/pause" onClick={this.playPause}>
              {playing ? 
                <PauseIcon className={classes.playIcon} /> : 
                <PlayArrowIcon className={classes.playIcon} />
              }
            </IconButton>
            <IconButton aria-label="FullScreen" onClick={this.onClickFullscreen}>
              <FullScreenIcon className={classes.playIcon} />
            </IconButton>
            {ReactPlayer.canEnablePIP(url) &&
              <IconButton aria-label="MiniPlayer" onClick={this.togglePIP}>
                <PictureIcon className={classes.playIcon}  />
              </IconButton>
            }
          </div>
        </div>
    );
  }
}

MainPlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainPlay);
