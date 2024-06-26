import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';

function Header({ title, onMenuClick, isSidebarOpen }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {!isDesktop && (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                )}
                <Typography variant="h6">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
