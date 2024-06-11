// resources/js/Components/Header.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ title }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
