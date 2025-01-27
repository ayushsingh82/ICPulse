import React, { useState, useEffect } from 'react';
// Temporarily comment out the import until declarations are generated
// import { arbitrage_bot } from '../declarations/arbitrage_bot';
import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Grid,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert
} from '@mui/material';

const Home = () => {
    // State management
    const [profitThreshold, setProfitThreshold] = useState(0.02);
    const [exchange1Price, setExchange1Price] = useState({
        exchange: 'Binance',
        price: 0,
        timestamp: Date.now()
    });
    const [exchange2Price, setExchange2Price] = useState({
        exchange: 'Coinbase',
        price: 0,
        timestamp: Date.now()
    });
    const [lastTrades, setLastTrades] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch initial threshold on component mount
    useEffect(() => {
        const fetchThreshold = async () => {
            try {
                // Temporary placeholder
                setProfitThreshold(0.02);
            } catch (err) {
                setError('Failed to fetch profit threshold');
            }
        };
        fetchThreshold();
    }, []);

    // Handle threshold update
    const handleThresholdUpdate = async () => {
        try {
            // Temporary placeholder
            setSuccess('Profit threshold updated successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update profit threshold');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Handle price check and arbitrage
    const checkArbitrage = async () => {
        try {
            // Temporary placeholder
            setSuccess('Checking arbitrage opportunity...');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to check arbitrage opportunity');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Arbitrage Trading Bot
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Grid container spacing={3}>
                    {/* Price Inputs */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Price Monitor
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Exchange 1 Price (USDT)"
                                        type="number"
                                        value={exchange1Price.price}
                                        onChange={(e) => setExchange1Price({
                                            ...exchange1Price,
                                            price: Number(e.target.value),
                                            timestamp: Date.now()
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Exchange 2 Price (USDT)"
                                        type="number"
                                        value={exchange2Price.price}
                                        onChange={(e) => setExchange2Price({
                                            ...exchange2Price,
                                            price: Number(e.target.value),
                                            timestamp: Date.now()
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        onClick={checkArbitrage}
                                    >
                                        Check Arbitrage
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Settings */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Bot Settings
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Profit Threshold (%)"
                                        type="number"
                                        value={profitThreshold * 100}
                                        onChange={(e) => setProfitThreshold(Number(e.target.value) / 100)}
                                        InputProps={{
                                            inputProps: { min: 0, step: 0.1 }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        onClick={handleThresholdUpdate}
                                    >
                                        Update Threshold
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Trade History */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Recent Trades
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Buy Exchange</TableCell>
                                            <TableCell>Buy Price</TableCell>
                                            <TableCell>Sell Exchange</TableCell>
                                            <TableCell>Sell Price</TableCell>
                                            <TableCell>Profit %</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {lastTrades.map((trade, index) => {
                                            const profitPercent = ((trade.sellExchange.price - trade.buyExchange.price) / trade.buyExchange.price) * 100;
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {new Date(trade.timestamp).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>{trade.buyExchange.exchange}</TableCell>
                                                    <TableCell>${trade.buyExchange.price}</TableCell>
                                                    <TableCell>{trade.sellExchange.exchange}</TableCell>
                                                    <TableCell>${trade.sellExchange.price}</TableCell>
                                                    <TableCell>{profitPercent.toFixed(2)}%</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;
