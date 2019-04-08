import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock, RoomList } from 'dan-components';
import { TableHotels } from './Elements';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class HotelsTablePage extends Component {

  constructor(){
    super();
    this.state = {
      stateType: false,
      item: ''
    }
  }
  _handleUpdateState = (item, stateType) => {
    this.setState(() => {
      return {stateType: stateType, item: item};
    });
  }

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

        {this.state.stateType ?
        <PapperBlock whiteBg icon="ios-create-outline" title="Tipos de Habitación" desc="En esta página podrás crear y eliminar los tipos de habitación de un hotel.">
          <div className={classes.root}>
            <RoomList item={this.state.item}/>
          </div>
        </PapperBlock>
             :
        <PapperBlock whiteBg icon="ios-create-outline" title="Hoteles" desc="En esta página podrás crear, eliminar y modificar hoteles.">
          <div className={classes.root}>
            <TableHotels updateState={this._handleUpdateState}/>
          </div>
        </PapperBlock>
        }
      </div>
    );
  }
}

HotelsTablePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelsTablePage);
