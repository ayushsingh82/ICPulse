import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Principal "mo:base/Principal";

actor ArbitrageBot {
    // Types for price data
    type PriceData = {
        exchange: Text;
        price: Float;
        timestamp: Int;
    };

    // Private variables
    private stable var minProfitThreshold: Float = 0.02; // 2% minimum profit
    private stable var tradingPairs: [Text] = ["BTC/USDT", "ETH/USDT"];
    private var lastTrades: [PriceData] = [];

    // Function to check price differences between exchanges
    public shared(msg) func checkArbitrage(
        exchange1Price: PriceData,
        exchange2Price: PriceData
    ) : async Bool {
        // Verify caller is authorized
        assert(_isAuthorized(msg.caller));

        let priceDiff = exchange1Price.price - exchange2Price.price;
        let profitPercentage = priceDiff / exchange1Price.price;

        if (profitPercentage > minProfitThreshold) {
            await executeArbitrage(exchange1Price, exchange2Price);
            return true;
        };
        
        return false;
    };

    // Private function to execute trades
    private func executeArbitrage(
        lowPrice: PriceData,
        highPrice: PriceData
    ) : async () {
        // Execute buy order on lower-priced exchange
        await _executeTrade(lowPrice.exchange, "BUY");
        
        // Execute sell order on higher-priced exchange
        await _executeTrade(highPrice.exchange, "SELL");
        
        // Log the trade
        lastTrades := Array.append(lastTrades, [lowPrice, highPrice]);
    };

    // Helper function to execute trades (implement your exchange integration here)
    private func _executeTrade(exchange: Text, orderType: Text) : async () {
        // Implement your exchange-specific trading logic here
        Debug.print("Executing " # orderType # " order on " # exchange);
    };

    // Authorization check
    private func _isAuthorized(caller: Principal) : Bool {
        // Implement your authorization logic here
        true
    };

    // Getter for minimum profit threshold
    public query func getMinProfitThreshold() : async Float {
        minProfitThreshold
    };

    // Setter for minimum profit threshold
    public shared(msg) func setMinProfitThreshold(newThreshold: Float) : async () {
        assert(_isAuthorized(msg.caller));
        minProfitThreshold := newThreshold;
    };
} 