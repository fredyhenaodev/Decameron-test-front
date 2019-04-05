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
      removeRow
    } = this.props;
    return (
      <MainTable
        title={title}
        items={dataTable}
        anchor={anchor}
        removeRow={removeRow}
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
};

export default HotelsData;
