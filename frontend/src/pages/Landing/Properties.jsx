import { Box } from '@mui/material'
import React from 'react'
import { useGetPropertiesQuery } from 'src/app/services/api';
import Loader from 'src/views/utilities/Loader';
import ListingCard from './components/ListingCard';
import { Product1 } from 'src/assets';

const Properties = () => {
    const { data: properties, isFetching: loading } = useGetPropertiesQuery();
    return (
        <Box>
            {/* filtering components */}

            {/* end of filtering components */}

            {/* properties */}
            {loading ? <Loader /> :
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            lg: 'repeat(4, 1fr)',
                            md: 'repeat(3, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            xs: 'repeat(1, 1fr)',
                        },
                        gap: 3,
                        my: 3,
                        mx: 2
                    }}
                >
                    {/* sorting from the latest to the oldest */}

                    {properties && !loading && properties?.length > 0 ?
                        properties?.map(p => (
                            <ListingCard key={p?._id} card={{
                                name: p?.name,
                                location: p?.address.country,
                                price: p?.price,
                                discount: p?.discount,
                                beds: p?.beds,
                                type: p?.type,
                                baths: p?.baths,
                                area: p?.area,
                                parking: p?.parking,
                                furnished: p?.furnished,
                                image: p?.imageUrls[0] || Product1,
                                description: p?.description
                            }} />
                        )) :
                        // static rendering
                        Array(4).fill(0).map((_, i) => (
                            <ListingCard key={i + Math.random()} card={{
                                name: `Property ${i + 1}`,
                                location: 'USA',
                                price: 1200,
                                discount: 50,
                                beds: 2,
                                baths: 2,
                                area: '1200 sqft',
                                parking: true,
                                furnished: true,
                                image: Product1
                            }} />
                        ))
                    }

                </Box>}
        </Box>
    )
}

export default Properties