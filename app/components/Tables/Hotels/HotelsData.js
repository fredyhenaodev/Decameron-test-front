import React from 'react';
import PropTypes from 'prop-types';
import MainTable from '../tableParts/MainTable';
import Form from '../tableParts/Form';
import FloatingPanel from '../../Panel/FloatingPanel';


class HotelsData extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }
  sendValues = (values) => {
    const { submit } = this.props;
      submit(values);
  }

  render() {
    const {
      title,
      openForm,
      closeForm,
      dataTable,
      anchor,
      removeRow,
      children,
      editRow,
      updateRow,
      finishEditRow,
      initValues,
      addNew,
      updateState
    } = this.props;
    return (
      <div>
        <FloatingPanel openForm={openForm} closeForm={closeForm}>
            <Form onSubmit={this.sendValues} initValues={initValues} >
              {children}
            </Form>
        </FloatingPanel>
        <MainTable
          title={title}
          items={dataTable}
          anchor={anchor}
          removeRow={removeRow}
          editRow={editRow}
          finishEditRow={finishEditRow}
          updateRow={updateRow}
          addNew={addNew}
          updateState={updateState}
        />
      </div>
    );
  }
}

HotelsData.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataTable: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default HotelsData;
