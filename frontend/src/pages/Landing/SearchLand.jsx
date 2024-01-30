import { Box, Container, Drawer, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LandsList from './components/LandsList'
import { useLocation, useNavigate } from 'react-router'
import { useGetCountriesQuery, useSearchLandQuery } from 'src/app/services/api'
import StyledButton from 'src/components/shared/StyledButton'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import CustomField from 'src/components/form/CustomField'

const DrawerContainer = styled(Drawer)({
  width: '300px',
});

const SearchLand = () => {
  // dealing url params
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const country = urlSearchParams.get('countryId')
  const city = urlSearchParams.get('cityId')
  const sort = urlSearchParams.get('sort')
  const order = urlSearchParams.get('order');

  // managing component states
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [urlParams, setUrlParams] = React.useState(location.search);


  // dealing with api data
  const { data: lands, isFetching: landsLoading } = useSearchLandQuery(`search?${urlParams}`);
  const { data: countries, isFetching: loading } = useGetCountriesQuery();


  

  const navigate = useNavigate();

  const handleCountryChange = (e) => {
    const country = countries?.countries?.find(country => country._id === e.target.value);
    setSelectedCountry(country);
    formik.setFieldValue('City', "");
    handleChange(e);
  };

  useEffect(() => {
    if (country) {
      const toUpdatecountry = countries?.countries?.find(ctry => ctry._id === country);
      setSelectedCountry(toUpdatecountry);
    }
  }, [countries]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Country: country || "",
      City: city || "",
      sortOrder: `${sort || "createdAt"}-${order || "desc"}`
    },
    onSubmit: (values) => {
      const sort = values.sortOrder.split('-')[0];
      const order = values.sortOrder.split('-')[1];
      const searchParams = new URLSearchParams();
      searchParams.set('countryId', values.Country);
      searchParams.set('cityId', values.City);
      searchParams.set('sort', sort);
      searchParams.set('order', order);
      setUrlParams(searchParams.toString());

      navigate(`/lands/search?${searchParams}`);

      setDrawerOpen(false);
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik

  return (
    <Container>
      <LandsList loading={landsLoading} lands={lands}
        filterComponent={
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <StyledButton onClick={() => setDrawerOpen(true)} variant="contained">Filter</StyledButton>
          </Box>} />

      {/* drawer for filtering form */}
      <DrawerContainer
        anchor='left'
        open={drawerOpen}
        PaperProps={{ sx: { width: '300px' } }}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{
          p: 2,
          display: 'flex', flexDirection: 'column', gap: 4,
          width: '100%',
        }}
        >
          <Box sx={{ px: 2 }}>
            <Typography variant='h5' fontWeight={'bold'} fontFamily="Plus Jakarta Sans">Filter Lands</Typography>
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
            <CustomField
              name="sortOrder"
              label="Sort"
              select
              onChange={handleChange}
              value={values.sortOrder}
            >
              <option value="">Select</option>
              <option value="createdAt-desc">Newest</option>
              <option value="createdAt-asc">Oldest</option>
              <option value="price-asc">Price from Low to High</option>
              <option value="price-desc">Price from High to Low</option>
            </CustomField>
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
    </Container>
  )
}

export default SearchLand