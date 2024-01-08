import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AmenitiesCard = ({ Icon, title, textDecoration, noBg }) => {
    const { darkMode } = useSelector(state => state.theme)
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: darkMode && !noBg ? 'white' : 'primary.main',

            }}
        >
            <Box sx={{ p: .5, backgroundColor: !noBg && 'primary.main', color: !noBg && 'white', borderRadius: '4px', }}> <Icon size={20} stroke={2.25} /></Box>
            <Typography variant="body2" fontSize='12px' sx={{ textDecoration: textDecoration }} color={darkMode ? 'primary.200' : 'primary.dark'} className='text-sm'>
                {title}
            </Typography>
        </Box>
    )
};
export default AmenitiesCard