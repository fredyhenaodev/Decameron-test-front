import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import css from 'dan-styles/Form.scss';

class Form extends Component {
  render() {
    const {
      handleSubmit,
      children,
      reset,
      pristine,
      submitting,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={css.bodyForm}>
            {children}
          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
              Guardar
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Resetear
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const FormMapped = reduxForm({
  form: 'Hotel',
  enableReinitialize: true,
})(Form);


const FormMappedInit = connect(
  state => ({
    initialValues: state.getIn(['hotelTable', 'formValues'])
  })
)(FormMapped);


export default FormMappedInit;
