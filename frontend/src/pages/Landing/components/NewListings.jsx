import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import { Product1, Product2, Product3, Product4 } from '../../../assets'
import { IconBed, IconCurrencyDollar, IconDiscount, IconHomeCog, IconLocation, IconMap, IconMapPin, IconParking, IconParkingCircle, IconSquare, IconToiletPaper } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ListingCard from './ListingCard'
import { useGetLandsQuery, useGetPropertiesQuery } from 'src/app/services/api'

const NewListings = () => {
    const { data: properties, isFetching: loading } = useGetPropertiesQuery();
    const { data: lands, isFetching } = useGetLandsQuery();
    return (
        <section className='my-12'>
            <Box>
                {/* Title */}
                <SectionTitle title='New Listings' />
                {/* Properties */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Plus Jakarta Sans' }}>
                            Properties
                        </Typography>
                        <Link to='/properties' style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }} >View All</Link>
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                lg: 'repeat(3, 1fr)',
                                md: 'repeat(3, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                xs: 'repeat(1, 1fr)',
                            },
                            gap: 3,
                            my: 3,
                        }}
                    >
                        {/* sorting from the latest to the oldest */}

                        {properties && !loading && properties?.length > 0 ?
                            properties?.slice(0, 3)
                                .sort((a, b) => new Date(b?._createdAt) - new Date(a?._createdAt))
                                .map(p => (
                                    <ListingCard key={p?._id} card={{
                                        property: true,
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
                                        description: p?.description,
                                        ...p
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

                {/* Lands */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Plus Jakarta Sans' }}>
                            Lands
                        </Typography>
                        <Link to='/lands' style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }} >View All</Link>
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                lg: 'repeat(3, 1fr)',
                                md: 'repeat(3, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                xs: 'repeat(1, 1fr)',
                            },
                            gap: 3,
                            my: 3,
                        }}
                    >
                        {lands && !isFetching && lands?.length > 0 ?
                            lands?.slice(0, 3)
                                ?.sort((a, b) => new Date(b?._createdAt) - new Date(a?._createdAt))
                                ?.map(p => (
                                    <ListingCard key={p?._id} card={{
                                        name: p?.name,
                                        location: p?.address.country,
                                        price: p?.price,
                                        discount: p?.discount,
                                        beds: p?.beds,
                                        type: p?.type,
                                        baths: p?.baths,
                                        area: p?.size,
                                        parking: p?.parking,
                                        furnished: p?.furnished,
                                        image: p?.images[0] || Product1,
                                        description: p?.description,
                                        ...p
                                    }} />
                                )) :
                            // static rendering
                            Array(4).fill(0).map((_, i) => (
                                <ListingCard key={i + Math.random()} card={{
                                    name: `Land ${i + 1}`,
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

            </Box>
        </section>
    )
}

export default NewListings