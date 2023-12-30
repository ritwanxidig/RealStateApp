import { Box, Container, Typography, Button } from '@mui/material';
import ErrorImg from '../../assets/images/backgrounds/404-error-idea.gif';
import StyledButton from '../../components/shared/StyledButton';
import { Link } from 'react-router-dom';

const Error400 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={ErrorImg} alt="404" style={{ width: '100%', maxWidth: '350px' }} />
        <Typography fontFamily="Plus Jakarta Sans" fontWeight="bold" align="center" variant="h3" mb={4}>
          Opps!!!
        </Typography>
        <Typography fontFamily="Plus Jakarta Sans" align="center" variant="h6" mb={4}>
          The page you are looking for does not exist.
        </Typography>
        <StyledButton
          color="primary"
          variant="contained"
          component={Link}
          to='/'
          disableElevation
        >
          Go Back to Home
        </StyledButton>
      </Container>
    </Box>
  )
};

export default Error400;
