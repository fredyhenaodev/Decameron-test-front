import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import { Checkbox, TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import styles from './user-jss';

// validation functions
import { required, email, passwordsMatch, passwordSecurity } from './helpers/validation'


class RegisterForm extends React.Component {
  state = {
    tab: 0,
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco
    } = this.props;
    const { tab } = this.state;
    return (
      <Paper className={classNames(classes.sideWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
          </NavLink>
          <Button size="small" className={classes.buttonLink} component={NavLink} to="/login">
            <Icon className={classes.icon}>arrow_forward</Icon>
            ¿Yá tienes cuenta?
          </Button>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Registro
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Ingresa los Datos
        </Typography>
        <Tabs
          value={tab}
          onChange={this.handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Usuario" />
        </Tabs>
        {tab === 0 && (
          <section>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="name"
                    component={TextField}
                    placeholder="Nombre"
                    label="Nombre"
                    validate={required}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="last_name"
                    component={TextField}
                    placeholder="Apellido"
                    label="Apellido"
                    validate={required}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextField}
                    placeholder="Correo electronico"
                    label="Correo electronico"
                    validate={[required, email]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextField}
                    type="password"
                    label="Contraseña"
                    validate={[required, passwordsMatch, passwordSecurity]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextField}
                    type="password"
                    label="Vuelva a escribir la contraseña"
                    validate={[required, passwordsMatch, passwordSecurity]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControlLabel control={<Field name="checkbox" component={Checkbox} validate={required} className={classes.agree} />} label="Acepto los" />
                <a href="#" className={classes.link}>Términos &amp; Condiciones</a>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" fullWidth color="primary" type="submit">
                    Continuar
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
            </form>
          </section>
        )}
      </Paper>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(RegisterForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
