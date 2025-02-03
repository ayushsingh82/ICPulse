import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        ICPulse
                    </Typography>
                    {location.pathname !== '/dashboard' && (
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </Button>
                    )}
                    {location.pathname !== '/' && (
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout; 