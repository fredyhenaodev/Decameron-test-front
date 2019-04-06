import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './cardStyle-jss';
import { ReactPlayer } from 'dan-components';

class PlayerCard extends React.Component {

  render() {
    const {
      classes,
      theme,
      title,
      artist,
      cover,
    } = this.props;

    return (
      <Card className={classes.cardSocmed}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <ReactPlayer className={classes.cardSocmed} />
        </div>
      </Card>
    );
  }
}

PlayerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlayerCard);
