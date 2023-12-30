import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AmenitiesCard = ({ Icon, title, textDecoration }) => {
    const { darkMode } = useSelector(state => state.theme)
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: 1,
                color: darkMode ? 'white' : 'primary.main',

            }}
        >
            <Box sx={{ p: .5, backgroundColor: 'primary.main', color: 'white', borderRadius: '4px', }}> <Icon size={20} stroke={2.25} /></Box>
            <Typography variant="body2" fontSize='12px' sx={{ textDecoration: textDecoration }} color={darkMode ? 'primary.200' : 'primary.dark'} className='text-sm'>
                {title}
            </Typography>
        </Box>
    )
};
export default AmenitiesCard