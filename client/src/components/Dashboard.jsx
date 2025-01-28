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
    Alert,
    Tab,
    Tabs
} from '@mui/material';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

const Dashboard = () => {  // Changed from Home to Dashboard
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

    // New state for chart and trading data
    const [chartData, setChartData] = useState([]);
    const [positions, setPositions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [timeframe, setTimeframe] = useState('24h'); // '24h', '7d', '30d'

    // Fetch ICP price data from CoinGecko
    useEffect(() => {
        const fetchPriceData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/internet-computer/market_chart?vs_currency=usd&days=${
                        timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : 30
                    }`
                );
                
                const formattedData = response.data.prices.map(([timestamp, price]) => ({
                    timestamp: new Date(timestamp).toLocaleString(),
                    price: price.toFixed(2)
                }));
                
                setChartData(formattedData);
            } catch (err) {
                setError('Failed to fetch price data');
            }
        };

        fetchPriceData();
        const interval = setInterval(fetchPriceData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [timeframe]);

    // Mock data for positions and orders
    useEffect(() => {
        // Simulated positions data
        setPositions([
            { id: 1, pair: 'ICP/USDT', size: '100', entry: '8.45', pnl: '+2.3%' },
            { id: 2, pair: 'ICP/USD', size: '50', entry: '8.40', pnl: '-1.2%' },
        ]);

        // Simulated orders data
        setOrders([
            { id: 1, type: 'BUY', pair: 'ICP/USDT', price: '8.45', size: '100', status: 'FILLED' },
            { id: 2, type: 'SELL', pair: 'ICP/USD', price: '8.50', size: '50', status: 'PENDING' },
        ]);
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart Section */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                ICP Price Chart
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant={timeframe === '24h' ? 'contained' : 'outlined'}
                                    onClick={() => setTimeframe('24h')}
                                    sx={{ mr: 1 }}
                                >
                                    24H
                                </Button>
                                <Button
                                    variant={timeframe === '7d' ? 'contained' : 'outlined'}
                                    onClick={() => setTimeframe('7d')}
                                    sx={{ mr: 1 }}
                                >
                                    7D
                                </Button>
                                <Button
                                    variant={timeframe === '30d' ? 'contained' : 'outlined'}
                                    onClick={() => setTimeframe('30d')}
                                >
                                    30D
                                </Button>
                            </Box>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="timestamp" 
                                        tick={{ fontSize: 12 }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis 
                                        domain={['auto', 'auto']}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="price" 
                                        stroke="#8884d8" 
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Trading Controls */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Trading Controls
                            </Typography>
                            {/* Existing price inputs and controls */}
                        </Paper>
                    </Grid>

                    {/* Positions and Orders Section */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab label="Positions" />
                                <Tab label="Orders" />
                                <Tab label="Trade History" />
                            </Tabs>
                            <Box sx={{ mt: 2 }}>
                                {tabValue === 0 && (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Pair</TableCell>
                                                    <TableCell>Size</TableCell>
                                                    <TableCell>Entry Price</TableCell>
                                                    <TableCell>PnL</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {positions.map((position) => (
                                                    <TableRow key={position.id}>
                                                        <TableCell>{position.pair}</TableCell>
                                                        <TableCell>{position.size}</TableCell>
                                                        <TableCell>{position.entry}</TableCell>
                                                        <TableCell>{position.pnl}</TableCell>
                                                        <TableCell>
                                                            <Button 
                                                                variant="contained" 
                                                                color="error" 
                                                                size="small"
                                                            >
                                                                Close
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                                {tabValue === 1 && (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Pair</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Size</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orders.map((order) => (
                                                    <TableRow key={order.id}>
                                                        <TableCell>{order.type}</TableCell>
                                                        <TableCell>{order.pair}</TableCell>
                                                        <TableCell>{order.price}</TableCell>
                                                        <TableCell>{order.size}</TableCell>
                                                        <TableCell>{order.status}</TableCell>
                                                        <TableCell>
                                                            <Button 
                                                                variant="outlined" 
                                                                color="error" 
                                                                size="small"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                                {tabValue === 2 && (
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
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;  // Changed from Home to Dashboard 