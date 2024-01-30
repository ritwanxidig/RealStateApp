import { Box } from '@mui/material'
import React from 'react'
import ListingCard from './ListingCard'
import SectionTitle from './SectionTitle'
import { Product1 } from 'src/assets'
import StyledButton from 'src/components/shared/StyledButton'

const LandsList = ({ loading, lands, filterComponent }) => {
    const [length, setLength] = React.useState(6);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} mx="auto">
            <SectionTitle title='Lands' />
            {filterComponent}

            {/* lands */}
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
                {lands && !loading && lands?.length > 0 ?
                    lands?.slice(0, length)
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
                    Array(3).fill(0).map((_, i) => (
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
            {!loading && lands?.length > 0 && lands?.length > length &&
                <StyledButton variant="contained" sx={{ mx: 'auto' }} onClick={() => setLength(length + 6)}>View More</StyledButton>
            }
        </Box>
    )
}

export default LandsList