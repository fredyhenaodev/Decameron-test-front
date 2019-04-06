import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HotelsData, Notification } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';

//Redux Saga
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import injectSaga from 'utils/injectSaga';

/**
 * Actions
 * */
import { fetchHotelInit, removeHotelSaga, addHotelSaga, editHotelSaga, editHotelAction,  saveHotelSaga, updateHotelAction, addHotelAction} from 'dan-actions/HotelActions';
import { allHotelsSaga, deleteHotelSaga, createHotelSaga, updateHotelSaga, hotelSaveSaga } from 'dan-redux/sagas/hotelSaga';


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

  /*fetchData = () => {
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

  addEmptyHotel = (item) => {
    const { dispatch } = this.props;
    dispatch(
      addHotelSaga(item)
    )
  }

  editHotel = (item) => {
    const { dispatch } = this.props;
    dispatch(
      editHotelSaga(item)
    )
  }*/

  render() {
    const {
      classes,
      fetchHotelInit,
      removeHotelSaga,
      addHotel,
      editHotelSaga,
      hotelData,
      closeNotif,
      messageNotif,
      editRow,
      updateRow,
      finishEditRow
    } = this.props;

    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          <HotelsData
            anchor={anchorTable}
            title="Hoteles Registrados"
            dataTable={hotelData}
            fetchData={fetchHotelInit}
            removeRow={removeHotelSaga}
            addEmptyRow={addHotel}
            editRow={editRow}
            finishEditRow={finishEditRow}
            updateRow={updateRow}
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

const mapDispatchToProps = dispatch => ({
  editRow: bindActionCreators(editHotelAction, dispatch),
  fetchHotelInit: bindActionCreators(fetchHotelInit, dispatch),
  removeHotelSaga: bindActionCreators(removeHotelSaga, dispatch),
  addHotel: bindActionCreators(addHotelAction, dispatch),
  editHotelSaga: bindActionCreators(editHotelSaga, dispatch),
  finishEditRow: bindActionCreators(saveHotelSaga, dispatch),
  updateRow: bindActionCreators(updateHotelAction, dispatch),
});

const withSagaGetHotels = injectSaga({ key: 'FETCH_HOTEL_INIT', saga: allHotelsSaga });
const withSagaDeleteHotel = injectSaga({ key: 'REMOVE_HOTEL_SAGA', saga: deleteHotelSaga });
const withSagaCreateHotel = injectSaga({ key: 'CREATE_HOTEL_SAGA', saga: createHotelSaga });
const withSagaEditeHotel = injectSaga({ key: 'EDIT_HOTEL_SAGA', saga: updateHotelSaga });
const withSagaSaveHotel = injectSaga({ key: 'SAVE_HOTEL_SAGA', saga: hotelSaveSaga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHotels);

export default compose(
  withSagaGetHotels,
  withSagaDeleteHotel,
  withSagaCreateHotel,
  withSagaEditeHotel,
  withSagaSaveHotel,
  withStyles(styles)
)(withConnect);
