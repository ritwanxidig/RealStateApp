import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  IconButton,
} from '@mui/material';
import { FaMinus, FaPlus } from 'react-icons/fa';

const NavItem = ({ item, pathDirect }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const ListItemStyled = styled(ListItem)({
    padding: '8px 10px',
    borderRadius: '10px',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
    whiteSpace: 'nowrap',
    marginBottom: '6px',
    // color: theme.palette.grey[700],
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.3)',
      '&:hover': {
        backgroundColor: theme.palette.primary[100],
        color: theme.palette.primary.main,
      },
    },
  });

  const ListItemIconStyled = styled(IconButton)({
    minWidth: '36px',
    p: '3px 0',
    color: 'inherit',
  });

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={item.external ? 'a' : NavLink}
        to={item.href}
        href={item.external ? item.href : ''}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={handleClick}
      >
        <ListItemIconStyled>
          {item.icon && <item.icon stroke={2} size="1.2rem" />}
        </ListItemIconStyled>
        <span  className='text-[14px]'>{item.title}</span>
        {item.dropdownItems && (
          <ListItemIconStyled>
            {open ? <FaMinus size="1rem" /> : <FaPlus size="1rem" />}
          </ListItemIconStyled>
        )}
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  pathDirect: PropTypes.any,
};

export default NavItem;
