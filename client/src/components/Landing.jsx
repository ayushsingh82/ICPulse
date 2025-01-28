import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Grid, 
    Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                mt: 8,
                mb: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <Typography 
                    variant="h2" 
                    component="h1" 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 4 }}
                >
                    ICP Arbitrage Trading Bot
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Maximize your profits with our advanced arbitrage trading system
                    powered by Internet Computer Protocol
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{ mt: 4, mb: 8 }}
                >
                    Launch Dashboard
                </Button>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                Private & Secure
                            </Typography>
                            <Typography>
                                Built on Calimero's private subnet for maximum security
                                and privacy of your trading strategies.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                High Performance
                            </Typography>
                            <Typography>
                                Execute trades with minimal latency using ICP's
                                high-performance infrastructure.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                Automated Trading
                            </Typography>
                            <Typography>
                                Set your parameters and let the bot automatically
                                execute profitable trades across exchanges.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Landing; 