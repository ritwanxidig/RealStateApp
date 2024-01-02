import { Box, Button, IconButton, Typography } from "@mui/material";
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

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const SelectedRowsContainer = styled(Box)({
    display: 'flex',
    width: '100%',
    padding: '2rem 2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  });

  const ToolBarContainer = styled(GridToolbarContainer)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    margin: '0 1rem',
    top: -20,
  });

  const SearchContainer = styled(GridToolbarQuickFilter)({
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '.5rem 1rem',
    backgroundColor: darkMode ? theme.palette.grey[700] : '#f5f5f5',
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    ':focus-within': {
      border: '1px solid primary',
      borderColor: darkMode ? theme.palette.primary[600] : theme.palette.primary[300],
    }
    // when focus

  });

  const FilterContainer = styled(GridToolbarFilterButton)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    padding: '.8rem 1rem',
    backgroundColor: darkMode ? theme.palette.grey[700] : '#f5f5f5',
    borderRadius: 8,
    border: 'none',
    outline: 'none',
    '& .MuiSvgIcon-root': {
      display: 'none',
    },


    // when focus

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
        <Box className="w-full" sx={{ height: '500px', width: '100%', borderRadius: '10px' }}>
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
