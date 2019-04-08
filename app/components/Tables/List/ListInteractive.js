import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Style
 * */
import { withStyles } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';

/**
 * Components UI
 * */
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Form from '../tableParts/Form';
import { Notification } from 'dan-components';

import { Field } from 'redux-form/immutable';
// import Select from '@material-ui/core/Select';
import {
  TextField,
  Select
} from 'redux-form-material-ui';

//Redux Saga
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import injectSaga from 'utils/injectSaga';

/**
 * Actions
 * */
import { closeNotifAction } from 'dan-actions/HotelActions';
import { fetchRoomHotelSaga, closeNotifRoomAction, fetchRoomSaga, fetchAccommodationSaga, addRoomHotelSaga } from 'dan-actions/RoomHotelAction';
import { getRoomHotelSaga, getRoomSaga, getAccommodationSaga, setRoomSaga } from 'dan-redux/sagas/roomHotelSaga';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    width: '100%'
  },
  demo: {
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    margin: '15px 0',
  },
  avatarCyan: {
    background: cyan[500]
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const reducer = 'roomHotel';

// validation functions
const required = value => (value == null ? 'Campo Requerido' : undefined);

/**
 * Componente representacional
 * */
class ListInteractive extends React.Component {
    state = {
      dense: false,
      secondary: true,
    };

    componentDidMount() {
      const { fetchHotelInit, item, fetchRoomsInit } = this.props;
      fetchHotelInit(item);
      fetchRoomsInit();
    }

    saveRef = ref => {
      this.ref = ref;
      return this.ref;
    };

    _submitAddRoom = (item) => {
      const { hotelData, addRoom } = this.props;
      item = item.toJS();
      item.id = hotelData.get('id');
      addRoom(item)
    }

    _handleChange = (event, item) => {
      const { fetchAccommodationsInit } = this.props;
      fetchAccommodationsInit(item);
    };

    _handleDelete = (id) => {
      //const { deleteHotelAssig } = this.props;
      console.warn('_handleDelete', id);
      //console.log(id);
      //deleteHotelAssig(id, branch);
    };

    render() {
      const {
        classes,
        roomData,
        hotelData,
        roomsData,
        accommodationsData,
        closeNotif,
        messageNotif,
       } = this.props;
      const { dense, secondary} = this.state;
      const trueBool = true;
      return (
        <div>
            <Notification close={() => closeNotif()} message={messageNotif} />
            <Form onSubmit={this._submitAddRoom} >
            
                <Fragment>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="flex-start"
                    direction="row"
                    spacing={24}
                  >
                    <Grid
                      item
                      md={12}
                      xs={12}
                      className={classes.demo}
                    >
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="flex-start"
                        direction="row"
                        spacing={24}
                      >
                        <Grid
                          item
                          md={2}
                          xs={12}
                          className={classes.demo}
                        >
                          <div>
                            <FormControl className={classes.formControl} fullWidth>
                              <Field
                                name="quantity"
                                label="# Habitaciones"
                                component={TextField}
                                validate={required}
                                type="number"
                              >
                              </Field>
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={5}
                          xs={12}
                          className={classes.demo}
                        >
                          <div>
                            <FormControl className={classes.formControl} fullWidth>
                              <InputLabel htmlFor="type_room_id">
                                Tipo de Habitación
                              </InputLabel>
                              <Field
                                name="type_room_id"
                                component={Select}
                                autoWidth={trueBool}
                                onChange={this._handleChange}
                                validate={required}
                              >
                                {roomsData.map((item, index) => (
                                  <MenuItem value={item.get('id')}>{item.get('name')}</MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={5}
                          xs={12}
                          className={classes.demo}
                        >
                          <div>
                            <FormControl className={classes.formControl} fullWidth>
                              <InputLabel htmlFor="accommodation_id">
                                Acomodación
                              </InputLabel>
                              <Field
                                name="accommodation_id"
                                component={Select}
                                autoWidth={trueBool}
                                validate={required}
                              >
                                {accommodationsData.map((item, index) => (
                                  <MenuItem value={item.get('id')}>{item.get('name')}</MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          </div>
                        </Grid>
                      </Grid>
                      <Divider className={classes.divider} />
                    </Grid>
                  </Grid>
                </Fragment>
          </Form>
          <Fragment>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="flex-start"
                    direction="row"
                    spacing={24}
                  >
          <Grid item xs={12} md={12}>
                      <div className={classes.demo2}>
                        <List dense={dense}>
                        {roomData.map((item, index) => (
                          <ListItem key={index + 1}>
                            <ListItemAvatar>
                              <Avatar className={classes.avatarCyan}>
                                <BeachAccessIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={'Tipo de Habitación'}
                              secondary={secondary ? item.get('type_room_name') : null}
                            />
                            <ListItemText
                              primary={'Acomodación'}
                              secondary={secondary ? item.get('accommodation_name') : null}
                            />
                            <ListItemText
                              primary={'Número'}
                              secondary={secondary ? item.get('quantity') : null}
                            />
                            <ListItemSecondaryAction>
                              <IconButton onClick={() => this._handleDelete(item.get('id_relation'))} aria-label="Delete">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                        </List>
                      </div>
                    </Grid>
                    </Grid>
                    </Fragment>
        </div>
      );
    }
}


ListInteractive.propTypes = {
  classes: PropTypes.object.isRequired,
  hotelData: PropTypes.object.isRequired,
  roomData: PropTypes.object.isRequire, 
  messageNotif: PropTypes.string.isRequired,
  initValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  force: state, // force state from reducer
  hotelData: state.getIn([reducer, 'hotelData']),
  roomData: state.getIn([reducer, 'typeRoom']),
  roomsData: state.getIn([reducer, 'rooms']),
  accommodationsData: state.getIn([reducer, 'accommodations']),
  initValues: state.getIn([reducer, 'formValues']),
  messageNotif: state.getIn(['hotelTable', 'notifMsg']),
});

const mapDispatchToProps = dispatch => ({
  fetchHotelInit: bindActionCreators(fetchRoomHotelSaga, dispatch),
  fetchRoomsInit: bindActionCreators(fetchRoomSaga, dispatch),
  fetchAccommodationsInit: bindActionCreators(fetchAccommodationSaga, dispatch),
  addRoom: bindActionCreators(addRoomHotelSaga, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const withSagaGetHotel = injectSaga({ key: 'FETCH_ROOM_HOTEL_INIT_SAGA', saga: getRoomHotelSaga });
const withSagaGetRooms = injectSaga({ key: 'FETCH_ROOM_INIT_SAGA', saga: getRoomSaga });
const withSagaGetAccommodations = injectSaga({ key: 'FETCH_ACCOMMODATION_INIT_SAGA', saga: getAccommodationSaga });
const withSagaSetRoom = injectSaga({ key: 'ADD_NEW_ROOM_HOTEL_SAGA', saga: setRoomSaga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListInteractive);

export default compose(
  withSagaGetHotel,
  withSagaGetRooms,
  withSagaGetAccommodations,
  withSagaSetRoom,
  withStyles(styles)
)(withConnect);