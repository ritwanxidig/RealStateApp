import React from 'react';
import Menuitems, { AdminMenuItems, UserMenuItems } from './MenuItems';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup';

const SidebarItems = () => {
    const { pathname } = useLocation();
    const { authenticatedUser } = useSelector((state) => state.auth);
    const pathDirect = pathname;

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav">
                {authenticatedUser.roles[0] === 'admin' ? AdminMenuItems.map((item) => {
                    // {/********SubHeader**********/}
                    if (item.subheader) {
                        return <NavGroup item={item} key={item.subheader} />;

                        // {/********If Sub Menu**********/}
                        /* eslint no-else-return: "off" */
                    } else {
                        return (
                            <NavItem item={item} key={item.id} pathDirect={pathDirect} />
                        );
                    }
                }) : UserMenuItems.map((item) => {
                    // {/********SubHeader**********/}
                    if (item.subheader) {
                        return <NavGroup item={item} key={item.subheader} />;

                        // {/********If Sub Menu**********/}
                        /* eslint no-else-return: "off" */
                    } else {
                        return (
                            <NavItem item={item} key={item.id} pathDirect={pathDirect} />
                        );
                    }
                })}
            </List>
        </Box>
    );
};
export default SidebarItems;
