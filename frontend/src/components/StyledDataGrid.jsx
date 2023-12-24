import React from 'react';
import { Table } from 'antd';

const StyledDataGrid = ({columns, rows}) => {


  return (
    <div>
      <Table
        theme="dark"
        columns={columns}
        dataSource={rows}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{
          y: 240
        }}
      />
    </div>
  );
};

export default StyledDataGrid;
