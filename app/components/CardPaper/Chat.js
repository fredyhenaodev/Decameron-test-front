import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './cardStyle-jss';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Chat extends React.Component {

  render() {
    const {
      classes,
      channel,
      title,
      artist
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
            <div id="tlkio" data-channel={`${channel}`} className={classes.chat}></div>
            </div>
        </Card>
    );
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Chat);
