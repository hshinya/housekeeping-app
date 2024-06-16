// resources/js/Components/Layout.jsx

import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return (
        <Box display="flex">
            <CssBaseline />
            <Header title={title} onMenuClick={handleMenuClick} isSidebarOpen={sidebarOpen} />
            {isDesktop && <Sidebar variant="permanent" open={true} onClose={handleSidebarClose} />}
            {!isDesktop && <Sidebar variant="temporary" open={sidebarOpen} onClose={handleSidebarClose} />}
            <Box component="main" flexGrow={1} mt={8} ml={isDesktop ? 20 : 0} p={2}>
                <Toolbar /> {/* ヘッダーの下に余白を作る */}
                {children}
            </Box>
        </Box>
    );
}

export default Layout;
