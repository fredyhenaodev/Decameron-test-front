import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HotelsData, Notification } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';

//Redux Saga
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import injectSaga from 'utils/injectSaga';

/**
 * Actions
 * */
import { fetchHotelInit, removeHotelSaga } from 'dan-actions/HotelActions';
import { allHotelsSaga, deleteHotelSaga } from 'dan-redux/sagas/hotelSaga';


const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'city',
    label: 'Ciudad',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'number_rooms',
    label: 'Número de Habitaciones',
    type: 'number',
    initialValue: 0,
    width: 'auto',
    hidden: false
  }, {
    name: 'address',
    label: 'Dirección',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'nit',
    label: 'Nit',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  },{
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false
  },
];

const reducer = 'hotelTable';

class TableHotels extends Component {

  fetchData = () => {
    const { dispatch } = this.props;
    dispatch(
      fetchHotelInit()
    );
  }

  removeHotel = (item) => {
    const { dispatch } = this.props;
    dispatch(
      removeHotelSaga(item)
    )
  }

  render() {
    const {
      classes,
      hotelData,
      closeNotif,
      messageNotif
    } = this.props;

    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          <HotelsData
            anchor={anchorTable}
            title="Hoteles Registrados"
            dataTable={hotelData}
            fetchData={this.fetchData}
            removeRow={this.removeHotel}
          />
        </div>
      </div>
    );
  }
}

TableHotels.propTypes = {
  classes: PropTypes.object.isRequired,
  hotelData: PropTypes.object.isRequired,
  messageNotif: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  force: state, // force state from reducer
  hotelData: state.getIn([reducer, 'hotelData']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
});

const materialHotel = withStyles(styles)(TableHotels);
const withSagaGetHotels = injectSaga({ key: 'FETCH_HOTEL_INIT', saga: allHotelsSaga });
const withSagaDeleteHotel = injectSaga({ key: 'REMOVE_HOTEL', saga: deleteHotelSaga });

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps
);

export default compose(
  withConnect,
  withSagaGetHotels,
  withSagaDeleteHotel
)(materialHotel);
