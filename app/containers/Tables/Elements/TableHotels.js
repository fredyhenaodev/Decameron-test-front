import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { HotelsData, Notification } from 'dan-components';

import { Field } from 'redux-form/immutable';
import {
  TextField
} from 'redux-form-material-ui';


//Redux Saga
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import injectSaga from 'utils/injectSaga';

/**
 * Actions
 * */
import { fetchHotelInit, removeHotelSaga, addHotelSaga, editHotelSaga, editHotelAction,  saveHotelSaga, updateHotelAction, addHotelAction, closeAction, closeNotifAction} from 'dan-actions/HotelActions';
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
  },
  {
    name: 'action',
    label: 'Tipo Habitaciones',
    type: 'static',
    initialValue: '',
    hidden: false
  },
  {
    name: 'action',
    label: 'Acciones',
    type: 'static',
    initialValue: '',
    hidden: false
  },
];

const styles = ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const required = value => (value == null ? 'Campo Requerido' : undefined);

const reducer = 'hotelTable';

class TableHotels extends Component {
  render() {
    const {
      classes,
      fetchHotelInit,
      removeHotelSaga,
      hotelData,
      closeNotif,
      messageNotif,
      editRow,
      updateRow,
      finishEditRow,
      closeForm,
      openForm,
      initValues,
      addNew,
      submit,
      updateState
    } = this.props;

    return (
      <div>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.rootTable}>
          <HotelsData
            anchor={anchorTable}
            title="Hoteles Registrados"
            dataTable={hotelData}
            fetchData={fetchHotelInit}
            removeRow={removeHotelSaga}
            editRow={editRow}
            finishEditRow={finishEditRow}
            updateRow={updateRow}
            closeForm={closeForm}
            openForm={openForm}
            initValues={initValues}
            addNew={addNew}
            submit={submit}
            updateState={updateState}
          >
            <div>
              <Field
                name="name"
                component={TextField}
                placeholder="Ingrese el Nombre del Hotel"
                label="Nombre del Hotel"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="city"
                component={TextField}
                placeholder="Ingrese la Ciudad"
                label="Ciudad"
                required
                validate={[required]}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="number_rooms"
                component={TextField}
                placeholder="Ingrese el Número de Habitaciones"
                label="Número de Habitaciones"
                required
                type="number"
                validate={[required]}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="address"
                component={TextField}
                placeholder="Ingrese la Dirección del Hotel"
                label="Dirección del Hotel"
                required
                validate={[required]}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="nit"
                component={TextField}
                placeholder="Ingrese el Nit del Hotel"
                label="Nit del Hotel"
                required
                validate={[required]}
                className={classes.field}
              />
            </div>
          </ HotelsData>
        </div>
      </div>
    );
  }
}

TableHotels.propTypes = {
  classes: PropTypes.object.isRequired,
  hotelData: PropTypes.object.isRequired,
  messageNotif: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  editRow: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  force: state, // force state from reducer
  hotelData: state.getIn([reducer, 'hotelData']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
  openForm: state.getIn([reducer, 'showFrm']),
  initValues: state.getIn([reducer, 'formValues']),
});

const mapDispatchToProps = dispatch => ({
  editRow: bindActionCreators(editHotelAction, dispatch),
  fetchHotelInit: bindActionCreators(fetchHotelInit, dispatch),
  removeHotelSaga: bindActionCreators(removeHotelSaga, dispatch),
  editHotelSaga: bindActionCreators(editHotelSaga, dispatch),
  finishEditRow: bindActionCreators(saveHotelSaga, dispatch),
  updateRow: bindActionCreators(updateHotelAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  addNew: bindActionCreators(addHotelAction, dispatch),
  submit: bindActionCreators(addHotelSaga, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
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
