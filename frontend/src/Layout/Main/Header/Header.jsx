import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Typography,
  Input,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import PropTypes from 'prop-types';
import { themeActions } from "../../../app/slices/themeSlice";

// components
import Profile from './Profile';
import {
  FaBell as IconBellRinging,
  FaSearch as IconSearch,
} from 'react-icons/fa';
import { FiSettings as IconSettings, FiMenu as IconMenu } from "react-icons/fi";
import { DarkModeSwitch } from '../../../components/DarkModeSwitch';
import { useDispatch, useSelector } from 'react-redux';
// import { themeActions } from 'src/app/reducers/themeSlice';
import CustomInput from '../../../components/form/CustomInput';
import { IconBell } from '@tabler/icons-react';
import { useTheme } from '@emotion/react';

const Header = (props) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(themeActions.toggleDarkMode());
  };
  const theme = useTheme();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'unset',
    background: darkMode ? theme.palette.primary[900] : '#fff',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const NavButton = styled(IconButton)((props) => ({
    padding: '5px 8px',
    background: props.backgroundcolor,
    borderRadius: '8px',
    height: '42px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: props.color,
    '&:hover': {

      backgroundColor: darkMode ? theme.palette.grey[800] : '#f5f5f5',
      //  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)',

    },
  }));



  return (
    <AppBarStyled
      position="sticky"
      color="default"
      className="shadow-lg"

    >
      <ToolbarStyled>
        <div className="flex gap-1 w-full items-center">
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
            sx={{
              display: {
                lg: 'none',
                xs: 'inline',
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>
          <Box className="flex w-full items-center" sx={{ display: { lg: 'flex', xs: 'none' }, }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Plus Jakarta Sans' }}>
              RealEstate Dashboard
            </Typography>
          </Box>
          <Box className="flex w-full items-center" sx={{ display: { lg: 'flex', xs: 'none' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '300px',
                color: 'primary.main'
              }}
            >
              <IconSearch className="z-10 -mr-8" style={{ color: 'primary.main' }} />
              <CustomInput
                cssclass="pl-10 text-[14px]"
                placeholder="Search here ..."
                id="search"
              />
            </Box>
          </Box>
          <div className="flex gap-4 mr-12">
            <DarkModeSwitch checked={!darkMode} onChange={() => toggleDarkMode()} />
          </div>
        </div>
        <Box flexGrow={1} />
        <Stack
          spacing={1}
          direction="row"
          width="20%"
          justifyContent="end"
          alignItems="center"
        >
          {/* notification */}
          <Badge variant="dot" color="warning">
            <NavButton backgroundcolor={darkMode ? '#FFE431' : "#FFF9D5"} color={darkMode ? "#fff" : "#FFE430"} >
              <IconBell size="26" stroke="1.5" />
            </NavButton>
          </Badge>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
