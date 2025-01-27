import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Layout = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ICP Arbitrage Bot
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout; 