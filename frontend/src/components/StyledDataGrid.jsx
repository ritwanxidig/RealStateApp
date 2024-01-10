import { Box, Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridFilterForm, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import Loader from "../views/utilities/Loader";

const StyledDataGrid = ({ data, columns, loading }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { darkMode } = useSelector((state) => state.theme);
  const theme = useTheme();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const SelectedRowsContainer = styled(Box)({
    display: 'flex',
    width: '100%',
    padding: smUp ? '1rem' : '2rem',  // Adjust padding for smaller screens
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  });

  const ToolBarContainer = styled(GridToolbarContainer)({
    display: 'flex',
    flexDirection: 'row',  // Change direction for smaller screens
    alignItems: 'start',
    justifyContent: 'space-between',
    padding: smUp ? '0.5rem' : '1rem',
    margin: '0 1rem',
    top: -20,
  });

  const SearchContainer = styled(GridToolbarQuickFilter)({
    display: 'flex',
    justifyContent: 'center',
    gap: smUp ? '0.5rem' : '1rem',
    padding: smUp ? '.5rem' : '.7rem',
    backgroundColor: darkMode ? theme.palette.grey[700] : '#f5f5f5',
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    ':focus-within': {
      border: '1px solid primary',
      borderColor: darkMode ? theme.palette.primary[600] : theme.palette.primary[300],
    }
  });

  const FilterContainer = styled(GridToolbarFilterButton)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: smUp ? '0.5rem' : '1rem',
    padding: smUp ? '.8rem' : '.7rem',
    backgroundColor: darkMode ? theme.palette.grey[700] : '#f5f5f5',
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    
  });

  if (loading) {
    return <Loader />;
  }

  const CustomToolbar = () => (
    <>
      {selectedRows && selectedRows.length > 0 ? (
        <SelectedRowsContainer>
          <Typography variant="h6">{selectedRows.length} Rows Selected</Typography>
          <IconButton sx={{ backgroundColor: 'red.500', color: 'white', ":hover": { backgroundColor: 'red.600' } }}><IconTrash size={26} /></IconButton>
        </SelectedRowsContainer>
      ) : (
        <ToolBarContainer>
          <SearchContainer
            variant="standard"
            placeholder="Search..."
            InputProps={{
              disableUnderline: true,
              sx: {

              },
            }}
            sx={{ border: 'none', outline: 'none', flexGrow: 1 }}

          />
          {/* I want to remove filter Icon */}
          <FilterContainer slotProps={{}} />

        </ToolBarContainer>
      )}
    </>
  );

  return (
    <div>
      {data && data?.length > 0 ? (
        <Box className="w-full" sx={{ display: 'flex', height: '500px', width: '100%', maxWidth: lgUp ? '1200px' : mdUp ? '1000px' : '616px', borderRadius: '10px' }}>
          <DataGrid
            rows={data}
            checkboxSelection
            disableColumnMenu
            onRowSelectionModelChange={handleSelectionChange}
            sx={{
              border: 'none',
              outline: 'none',
              width: '100%',
              "& .MuiDataGrid-cell": {
                borderBottom: 0.2,
                borderColor: darkMode ? 'primary.700' : 'grey.300',
                fontSize: '.8rem',
                textTransform: 'capitalize',
                color: darkMode ? 'grey.300' : '',
                width: '100%',
              },
              "& .MuiDataGrid-row": {
                height: '4rem',
                color: darkMode ? 'grey.300' : '',
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.05)' : 'white',
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: darkMode ? 'primary.800' : 'grey.100',
                color: darkMode ? 'grey.300' : '',
                borderRadius: '0',
              },
              "& .MuiDataGrid-columnHeader": {
                fontSize: '.9rem',
              },
            }}
            columns={columns}
            pagination={{}}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            slots={{ toolbar: CustomToolbar }}
            slotProps={{
              toolbar: {
                printOptions: {
                  hideFooter: true,
                },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <p className="text-sm p-4" >There is no data, please check your connection</p>
      )}
    </div>
  );
};

export default StyledDataGrid;
