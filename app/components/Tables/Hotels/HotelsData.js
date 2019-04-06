import React from 'react';
import PropTypes from 'prop-types';
import MainTable from '../tableParts/MainTable';

class HotelsData extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const {
      title,
      dataTable,
      anchor,
      removeRow,
      addEmptyRow,
      editRow,
      updateRow,
      finishEditRow
    } = this.props;
    return (
      <MainTable
        title={title}
        items={dataTable}
        anchor={anchor}
        removeRow={removeRow}
        addEmptyRow={addEmptyRow}
        editRow={editRow}
        finishEditRow={finishEditRow}
        updateRow={updateRow}
      />
    );
  }
}

HotelsData.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataTable: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  addEmptyRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
};

export default HotelsData;
