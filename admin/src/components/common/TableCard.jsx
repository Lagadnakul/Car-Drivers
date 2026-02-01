import React from 'react';
import Card from './Card';
import Table from './Table';

const TableCard = ({ title, columns, data, onRowClick, loading, emptyMessage, actionButton, filters }) => {
  return (
    <Card>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {actionButton}
        </div>
      )}
      
      {filters && (
        <div className="mb-4">
          {filters}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : data.length > 0 ? (
        <Table columns={columns} data={data} onRowClick={onRowClick} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {emptyMessage || "No data available"}
        </div>
      )}
    </Card>
  );
};

export default TableCard;