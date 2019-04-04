import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import { TableHotels } from './Elements';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class HotelsTablePage extends Component {
  render() {
    const title = brand.name + ' - Table';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg icon="ios-create-outline" title="Hoteles" desc="En esta página podrás crear, eliminar y modificar hoteles.">
          <div className={classes.root}>
            <TableHotels />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

HotelsTablePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelsTablePage);
