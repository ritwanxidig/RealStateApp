import styled from '@emotion/styled'
import { Box, Drawer, Typography } from '@mui/material'
import React from 'react'
import CustomField from 'src/components/form/CustomField';

const DrawerContainer = styled(Drawer)({
    width: '300px',
});

const SearchProperty = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    return (

        <Box
            sx={{

            }}
        >
            <DrawerContainer
                anchor='left'
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ display: 'flex', width: '100%', height: '100%', px: 2 }}>
                    <Typography variant='h5' fontWeight={'bold'} fontFamily="Plus Jakarta Sans">Filter Property</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', width: '100%', height: '100%', px: 2 }}>
                    <CustomField
                        name="Address.country"
                        label="Country"
                        select
                    >
                        <option value="">Select Country</option>
                    </CustomField>
                    <CustomField
                        name="Address.city"
                        label="City"
                        select
                    >
                        <option value="">Select City</option>
                    </CustomField>
                </Box>
            </DrawerContainer>
        </Box>
    )
}

export default SearchProperty