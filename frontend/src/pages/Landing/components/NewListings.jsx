import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import SectionTitle from './SectionTitle'
import { Product1, Product2, Product3, Product4 } from '../../../assets'
import { IconBed, IconCurrencyDollar, IconDiscount, IconHomeCog, IconLocation, IconMap, IconMapPin, IconParking, IconParkingCircle, IconSquare, IconToiletPaper } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ListingCard from './ListingCard'

const NewListings = () => {
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
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Hargeisa, Somaliland',
                        price: 12,
                        discount: 2,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product1,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Borama, Somaliland',
                        price: 12,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product2,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Buroa, Somaliland',
                        price: 12,
                        discount: 8,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product3,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Ceerigaabo, Somaliland',
                        price: 12,
                        discount: 2,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product4,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Berbera, Somaliland',
                        price: 12,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product1,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Hargeisa, Somaliland',
                        price: 12,
                        discount: 2,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product1,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Borama, Somaliland',
                        price: 12,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product2,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />
                    <ListingCard card={{
                        name: 'Card 1',
                        location: 'Buroa, Somaliland',
                        price: 12,
                        discount: 8,
                        beds: 8,
                        baths: 4,
                        area: '12x24',
                        parking: true,
                        furnished: true,
                        image: Product3,
                        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quos expedita esse libero molestias quisquam, tempora voluptatum sapiente doloremque excepturi voluptatem suscipit earum facere voluptatibus quas tenetur sunt alias. Alias aliquam molestias quam porro, ea sapiente ipsum cupiditate odit adipisci! Quidem, error inventore! Inventore facere deleniti ipsam placeat. Similique, hic?"
                    }} />

                </Box>

            </Box>
        </section>
    )
}

export default NewListings