import styled from '@emotion/styled'
import { Box, Drawer, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { useGetCountriesQuery } from 'src/app/services/api';
import CustomField from 'src/components/form/CustomField';
import StyledButton from 'src/components/shared/StyledButton';

const DrawerContainer = styled(Drawer)({
    width: '300px',
});

const SearchProperty = () => {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const country = urlSearchParams.get('country');
    const city = urlSearchParams.get('city');
    const type = urlSearchParams.get('type');
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [urlParams, setUrlParams] = React.useState("");


    const { data: countries, isFetching: loading } = useGetCountriesQuery();


    const navigate = useNavigate();

    const handleCountryChange = (e) => {
        const country = countries?.countries?.find(country => country._id === e.target.value);
        setSelectedCountry(country);
        handleChange(e);
    };


    useEffect(() => {
        if(country){
            const toUpdatecountry = countries?.countries?.find(ctry => ctry._id === country);
            setSelectedCountry(toUpdatecountry);
        }
    }, [countries]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            Country: country || "",
            City: city || "",
            type: type || "rent",
        },
        onSubmit: (values) => {
            const searchParams = new URLSearchParams();
            searchParams.set('country', values.Country);
            searchParams.set('city', values.City);
            searchParams.set('type', values.type);
            setUrlParams(searchParams.toString());

            navigate(`/properties/search?${searchParams}`);

            setDrawerOpen(false);
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

    return (

        <Box
            sx={{

            }}
        >
            <DrawerContainer
                anchor='left'
                open={drawerOpen}
                PaperProps={{ sx: { width: '300px' } }}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        p: 2,
                        display: 'flex', flexDirection: 'column', gap: 4,
                        width: '100%',
                    }}
                >
                    <Box sx={{ px: 2 }}>
                        <Typography variant='h5' fontWeight={'bold'} fontFamily="Plus Jakarta Sans">Filter Property</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'start',
                        alignItems: 'start', gap: 2,
                        width: '100%',
                        height: '100%',
                        px: 2
                    }}>
                        <CustomField
                            name="Country"
                            label="Country"
                            select
                            onChange={handleCountryChange}
                            value={values.Country}
                        >
                            <option value="">Select Country</option>
                            {countries?.countries?.length > 0 ? countries?.countries?.map(country => (
                                <option key={country._id} value={country._id}>{country.name}</option>
                            )) : <option value=""> No Data </option>}
                        </CustomField>
                        <CustomField
                            name="City"
                            label="City"
                            select
                            onChange={handleChange}
                            value={values.City}
                        >
                            <option value="">Select City</option>
                            {selectedCountry?.cities?.length > 0 ? selectedCountry?.cities?.map(city => (
                                <option key={city._id} value={city._id}>{city.name}</option>
                            )) : <option value=""> No Data </option>}
                        </CustomField>
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between', px: 1, width: '100%',
                            gap: 2
                        }}
                        >
                            <Box
                                onClick={() => formik.setFieldValue('type', 'rent')}
                                sx={{
                                    px: 4, py: 1, border: '1px solid', borderColor: 'primary.main',
                                    borderRadius: '5px', color: values.type === 'rent' ? 'white' : 'primary.main',
                                    cursor: 'pointer', backgroundColor: values.type === 'rent' ? 'primary.main' : 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark', color: 'white',
                                    },
                                    transition: 'all 0.3s ease',
                                }}>
                                Rent
                            </Box>
                            <Box onClick={() => formik.setFieldValue('type', 'sale')}
                                sx={{
                                    px: 4, py: 1, border: '1px solid', borderColor: 'primary.main',
                                    borderRadius: '5px', color: values.type === 'sale' ? 'white' : 'primary.main',
                                    cursor: 'pointer', backgroundColor: values.type === 'sale' ? 'primary.main' : 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark', color: 'white',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Sale
                            </Box>
                        </Box>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleSubmit}
                            sx={{ width: '100%' }}
                        >
                            Search
                        </StyledButton>
                    </Box>
                </Box>
            </DrawerContainer>
        </Box>
    )
}

export default SearchProperty