import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

//Redux Saga
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import injectSaga from 'utils/injectSaga';

/**
 * Actions
 * */
import { fetchSignupInit } from 'dan-actions/LoginActions';
import { signupSaga } from 'dan-redux/sagas/loginSaga';

class Register extends React.Component {
  state = {
    valueForm: []
  }

  submitForm = values => {
    const { dispatch } = this.props;
    dispatch(
      fetchSignupInit({
        username: values.get('name') + ' ' + values.get('last_name'),
        email: values.get('email'),
        password: values.get('password')
      })
    );
  }

  render() {
    const title = brand.name + ' - Registro';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.rootFull}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.containerSide}>
          <Hidden smDown>
            <div className={classes.opening}>
              <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>Hola...un gusto conocerte</Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>Regístrate para unirte a nosotros</Typography>
            </div>
          </Hidden>
          <div className={classes.sideFormWrap}>
            <RegisterForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialLogin = withStyles(styles)(Register);
const withSaga = injectSaga({ key: 'FETCH_SIGNUP_INIT', saga: signupSaga });
const withConnect = connect();

export default compose(
  withConnect,
  withSaga
)(materialLogin);
