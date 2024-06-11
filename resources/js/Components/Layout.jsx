// resources/js/Components/Layout.jsx

import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ title, children }) {
    return (
        <Box display="flex">
            <Sidebar />
            <Container style={{ marginLeft: '240px' }}>
                <Header title={title} />
                {children}
            </Container>
        </Box>
    );
}

export default Layout;
