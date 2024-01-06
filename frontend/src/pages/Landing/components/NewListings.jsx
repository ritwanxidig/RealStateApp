import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import { Product1, Product2, Product3, Product4 } from '../../../assets'
import { IconBed, IconCurrencyDollar, IconDiscount, IconHomeCog, IconLocation, IconMap, IconMapPin, IconParking, IconParkingCircle, IconSquare, IconToiletPaper } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ListingCard from './ListingCard'
import { useGetPropertiesQuery } from 'src/app/services/api'

const NewListings = () => {
    const { data: properties, isFetching: loading } = useGetPropertiesQuery();
    return (
        <section className='my-12'>
            <Box>
                {/* Title */}
                <SectionTitle title='New Listings' />
                {/* creating a grid container that contains 4 cells in large, 3 cells in medium, and 2 cells in small and one cell in  in extra small */}
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
                        properties?.slice(0, 4)
                            .map(p => (
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

                </Box>

            </Box>
        </section>
    )
}

export default NewListings