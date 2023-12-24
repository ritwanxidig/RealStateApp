// material-ui

// project import
import MainCard from 'components/MainCard';
import StyledDataGrid from 'components/StyledDataGrid';
import React from 'react';
import { Link } from 'react-router-dom';
import AddSample from './components/AddSample';
import { Box } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const [addOpen, setAddOpen] = React.useState(false);
  const columns = [
    //    each column must have title , dataIndex ,width and key
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (_, selected) => <Link>{selected.name}</Link>
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ];
  const rows = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '6',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '6',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  return (
    <>
      {addOpen && <AddSample onOpen={addOpen} setOnOpen={setAddOpen} />}
      <MainCard
        title="Sample Card"
        secondary={
          <button className="btn1 bg-blue-500 text-white" onClick={() => setAddOpen(true)}>
            New
          </button>
        }
      >
        <Box sx={{ height: 400, width: '100%' }}>
          <StyledDataGrid rows={rows} columns={columns} />
        </Box>
      </MainCard>
    </>
  );
};

export default SamplePage;
