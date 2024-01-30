import React from 'react'
import SectionTitle from './SectionTitle'
import { Box } from '@mui/material'
import Loader from 'src/views/utilities/Loader'
import { Link } from 'react-router-dom'
import ListingCard from './ListingCard'
import { Product1 } from 'src/assets'
import StyledButton from 'src/components/shared/StyledButton'

const PropertyList = ({ loading, properties, filterComponent }) => {
    const [length, setLength] = React.useState(6);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} mx="auto">

            <SectionTitle title='Properties' />
            {filterComponent}

            {/* properties */}
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
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {loading && Array(3).fill(0).map((_, i) => (
                    <ListingCard key={i + Math.random()} card={{
                        name: `Property ${i + 1}`,
                        location: 'USA',
                        price: 1200,
                        discount: 50,
                        beds: 2,
                        type: 'rent',
                        property: true,
                        baths: 2,
                        area: '1200 sqft',
                        parking: true,
                        furnished: true,
                        image: Product1
                    }} />
                ))}

                {properties && !loading && properties?.length > 0 ?
                    properties?.slice(0, length)
                        ?.sort((a, b) => new Date(b?._createdAt) - new Date(a?._createdAt))
                        ?.map(p => (
                            <ListingCard key={p?._id} card={{
                                name: p?.name,
                                location: p?.address.country,
                                price: p?.price,
                                discount: p?.discount,
                                beds: p?.beds,
                                property: true,
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
                    <p>No matched data</p>
                }


            </Box>
            {!loading && properties?.length > 0 && length < properties?.length && (
                <StyledButton variant="contained" sx={{ mx: 'auto' }} onClick={() => setLength(length + 6)}>View More</StyledButton>
            )}

        </Box>
    )
}

export default PropertyList