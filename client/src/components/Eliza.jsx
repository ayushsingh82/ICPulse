import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Eliza = () => {
    const [arbitrageOpportunities, setArbitrageOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [exchanges] = useState([
        { name: 'Binance', endpoint: 'https://api.binance.com/api/v3/ticker/price?symbol=ICPUSDT' },
        { name: 'Coinbase', endpoint: 'https://api.pro.coinbase.com/products/ICP-USD/ticker' },
        { name: 'Huobi', endpoint: 'https://api.huobi.pro/market/detail/merged?symbol=icpusdt' }
    ]);

    // 1. Arbitrage Detection Function
    const findArbitrageOpportunities = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const prices = await Promise.all(exchanges.map(async (exchange) => {
                const response = await axios.get(exchange.endpoint);
                let price;
                
                // Handle different API response formats
                switch(exchange.name) {
                    case 'Binance':
                        price = parseFloat(response.data.price);
                        break;
                    case 'Coinbase':
                        price = parseFloat(response.data.price);
                        break;
                    case 'Huobi':
                        price = parseFloat(response.data.tick.close);
                        break;
                    default:
                        price = 0;
                }

                return {
                    exchange: exchange.name,
                    price: price,
                    timestamp: Date.now()
                };
            }));

            // Find arbitrage opportunities
            const opportunities = [];
            for (let i = 0; i < prices.length; i++) {
                for (let j = i + 1; j < prices.length; j++) {
                    const priceDiff = Math.abs(prices[i].price - prices[j].price);
                    const profitPercentage = (priceDiff / Math.min(prices[i].price, prices[j].price)) * 100;

                    if (profitPercentage > 0.5) { // Minimum 0.5% profit threshold
                        opportunities.push({
                            buyExchange: prices[i].price < prices[j].price ? prices[i] : prices[j],
                            sellExchange: prices[i].price > prices[j].price ? prices[i] : prices[j],
                            profitPercentage: profitPercentage,
                            timestamp: Date.now()
                        });
                    }
                }
            }

            setArbitrageOpportunities(opportunities);
        } catch (err) {
            setError('Failed to fetch price data: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Trade Execution Function
    const executeArbitrageTrade = async (opportunity) => {
        try {
            // Validate opportunity still exists
            const currentPrices = await Promise.all([
                axios.get(exchanges.find(e => e.name === opportunity.buyExchange.exchange).endpoint),
                axios.get(exchanges.find(e => e.name === opportunity.sellExchange.exchange).endpoint)
            ]);

            // Verify the opportunity still exists with current prices
            const buyPrice = parseFloat(currentPrices[0].data.price);
            const sellPrice = parseFloat(currentPrices[1].data.price);
            const currentProfit = ((sellPrice - buyPrice) / buyPrice) * 100;

            if (currentProfit < 0.5) {
                throw new Error('Opportunity no longer profitable');
            }

            // Execute the trades
            const trade = {
                buyOrder: {
                    exchange: opportunity.buyExchange.exchange,
                    price: buyPrice,
                    amount: 1, // Default amount
                    type: 'MARKET'
                },
                sellOrder: {
                    exchange: opportunity.sellExchange.exchange,
                    price: sellPrice,
                    amount: 1, // Default amount
                    type: 'MARKET'
                },
                timestamp: Date.now(),
                expectedProfit: currentProfit
            };

            // Here you would integrate with your actual trading API
            // This is a mock implementation
            console.log('Executing trade:', trade);
            
            return {
                success: true,
                trade: trade,
                message: 'Trade executed successfully'
            };

        } catch (err) {
            throw new Error('Failed to execute trade: ' + err.message);
        }
    };

    // Auto-refresh arbitrage opportunities
    useEffect(() => {
        findArbitrageOpportunities();
        const interval = setInterval(findArbitrageOpportunities, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Arbitrage Opportunities</h2>
                <button 
                    onClick={findArbitrageOpportunities}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? 'Scanning...' : 'Scan for Opportunities'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Buy Exchange</th>
                            <th className="px-6 py-3 text-left">Buy Price</th>
                            <th className="px-6 py-3 text-left">Sell Exchange</th>
                            <th className="px-6 py-3 text-left">Sell Price</th>
                            <th className="px-6 py-3 text-left">Profit %</th>
                            <th className="px-6 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arbitrageOpportunities.map((opportunity, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-6 py-4">{opportunity.buyExchange.exchange}</td>
                                <td className="px-6 py-4">${opportunity.buyExchange.price.toFixed(2)}</td>
                                <td className="px-6 py-4">{opportunity.sellExchange.exchange}</td>
                                <td className="px-6 py-4">${opportunity.sellExchange.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-green-500">
                                    {opportunity.profitPercentage.toFixed(2)}%
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => executeArbitrageTrade(opportunity)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                    >
                                        Execute
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Eliza;
