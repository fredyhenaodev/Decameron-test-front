import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { VideoCard, Chat } from 'dan-components';

const styles = theme => ({
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  }
});

class Tv extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={16}
      >
        <Grid item md={7}>
          <Typography variant="button" className={classes.divider}></Typography>
          <VideoCard
            title="COBYTZ Tv"
            artist="En Vivo"
            date="September 14, 2016"
          />
        </Grid>
        <Grid item md={5}>
          <Typography variant="button" className={classes.divider}></Typography>
          <Chat
            title="COBYTZ Chat"
            artist="En Vivo"
            channel={'COBYTZTV'}
          />
        </Grid>
      </Grid>
    );
  }
}

Tv.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tv);