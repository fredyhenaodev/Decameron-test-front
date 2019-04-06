import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import imgApi from 'dan-api/images/photos';
import { PlayerCard, Chat } from 'dan-components';

const styles = theme => ({
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  }
});

class Radio extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={16}
      >
        <Grid item md={7}>
          <Typography variant="button" className={classes.divider}></Typography>
          <div>
          <PlayerCard
              title="COBYTZ Radio"
              artist="En Vivo"
              cover={imgApi[32]}
            />
          </div>
        </Grid>
        <Grid item md={5}>
          <Typography variant="button" className={classes.divider}></Typography>
          <div>
          <Chat  
            title="COBYTZ Chat"
            artist="En Vivo"
            channel={'COBYTZRADIO'} 
          />
          </div>
        </Grid>
      </Grid>
    );
  }
}

Radio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Radio);