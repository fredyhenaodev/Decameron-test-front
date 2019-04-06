import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

//Redux Saga
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import injectSaga from 'utils/injectSaga';

/**
 * Actions
 * */
import { fetchLoginInit } from 'dan-actions/LoginActions';
import { loginSaga } from 'dan-redux/sagas/loginSaga';

class Login extends React.Component {
  state = {
    valueForm: []
  }

  submitForm = values => {
    const { dispatch } = this.props;
      dispatch(
        fetchLoginInit({
          email: values.get('email'),
          password: values.get('password')
        })
      );
  }

  render() {
    const title = brand.name + ' - Login';
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
              <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
                Bienvenido a&nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>Por favor ingresa para continuar</Typography>
            </div>
          </Hidden>
          <div className={classes.sideFormWrap}>
            <LoginForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialLogin = withStyles(styles)(Login);
const withSaga = injectSaga({ key: 'FETCH_LOGIN_INIT', saga: loginSaga });
const withConnect = connect();

export default compose(
  withConnect,
  withSaga
)(materialLogin);
