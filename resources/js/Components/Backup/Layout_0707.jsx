import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { InertiaLink } from '@inertiajs/inertia-react';

function Layout({ children, title }) {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <InertiaLink href="/" style={{ color: '#fff', marginRight: '10px' }}>Home</InertiaLink>
                    <InertiaLink href="/transactions" style={{ color: '#fff', marginRight: '10px' }}>Transactions</InertiaLink>
                    <InertiaLink href="/categories" style={{ color: '#fff' }}>Categories</InertiaLink>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
                {children}
            </Container>
        </div>
    );
}

export default Layout;
