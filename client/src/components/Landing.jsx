import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Grid, 
    Paper,
    useTheme,
    alpha,
    Fade,
    keyframes
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Define animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const Landing = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const features = [
        {
            icon: <SecurityIcon sx={{ fontSize: 40, mb: 2, color: '#fff' }} />,
            title: 'Private & Secure',
            description: "Built on Calimero's private subnet for maximum security and privacy of your trading strategies."
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40, mb: 2, color: '#fff' }} />,
            title: 'High Performance',
            description: "Execute trades with minimal latency using ICP's high-performance infrastructure."
        },
        {
            icon: <TrendingUpIcon sx={{ fontSize: 40, mb: 2, color: '#fff' }} />,
            title: 'Automated Trading',
            description: 'Set your parameters and let the bot automatically execute profitable trades across exchanges.'
        }
    ];

    return (
        <Box sx={{ 
            backgroundColor: '#111',
            minHeight: 'calc(100vh - 64px)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Pattern */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.05,
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px',
                animation: `${pulse} 4s ease-in-out infinite`
            }} />

            <Container maxWidth="lg">
                <Fade in timeout={1000}>
                    <Box sx={{ 
                        pt: { xs: 8, md: 12 },
                        pb: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 4,
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                            <Box sx={{
                                backgroundColor: alpha('#fff', 0.1),
                                borderRadius: '50%',
                                p: 2,
                                mb: { xs: 2, sm: 0 },
                                mr: { sm: 3 },
                                animation: `${float} 3s ease-in-out infinite`
                            }}>
                                <AutoGraphIcon sx={{ 
                                    fontSize: 60,
                                    color: '#00ff88'
                                }} />
                            </Box>
                            <Typography 
                                variant="h2" 
                                component="h1" 
                                sx={{ 
                                    fontWeight: 700,
                                    letterSpacing: '-0.5px',
                                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                    background: 'linear-gradient(45deg, #fff 30%, #00ff88 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                ICPulse
                            </Typography>
                        </Box>

                        <Typography 
                            variant="h5" 
                            sx={{ 
                                mb: 6, 
                                maxWidth: '800px',
                                color: alpha('#fff', 0.9),
                                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                px: 2
                            }}
                        >
                            Maximize your profits with our advanced arbitrage trading system
                            powered by Internet Computer Protocol and Calimero's private subnet
                        </Typography>

                        <Box sx={{ mb: 8 }}>
                            <Button 
                                variant="contained" 
                                size="large"
                                onClick={() => navigate('/dashboard')}
                                sx={{ 
                                    py: 2,
                                    px: { xs: 4, sm: 6 },
                                    fontSize: { xs: '1rem', sm: '1.2rem' },
                                    backgroundColor: '#00ff88',
                                    color: '#111',
                                    '&:hover': {
                                        backgroundColor: '#00cc6a',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 20px rgba(0,255,136,0.3)'
                                    },
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0,255,136,0.2)'
                                }}
                                startIcon={<AccountBalanceIcon />}
                            >
                                Launch Dashboard
                            </Button>
                        </Box>

                        <Grid container spacing={4} sx={{ mt: 4 }}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <Fade in timeout={1000 + (index * 500)}>
                                        <Paper 
                                            elevation={4}
                                            sx={{ 
                                                p: 4, 
                                                height: '100%',
                                                backgroundColor: alpha('#fff', 0.05),
                                                backdropFilter: 'blur(10px)',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    backgroundColor: alpha('#fff', 0.08),
                                                    border: '1px solid rgba(0,255,136,0.3)',
                                                    boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
                                                },
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {React.cloneElement(feature.icon, {
                                                sx: { 
                                                    fontSize: 40, 
                                                    mb: 2, 
                                                    color: '#00ff88'
                                                }
                                            })}
                                            <Typography 
                                                variant="h5" 
                                                gutterBottom 
                                                sx={{ 
                                                    color: '#fff',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography 
                                                sx={{ 
                                                    color: alpha('#fff', 0.7),
                                                    textAlign: 'center',
                                                    lineHeight: 1.6
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Paper>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Landing; 