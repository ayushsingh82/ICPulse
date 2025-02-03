import React, { useState, useEffect } from 'react';
import { icpPlugin } from "@elizaos/plugin-icp";
import { Principal } from '@dfinity/principal';

const Eliza = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const [tokenDetails, setTokenDetails] = useState({
    name: '',
    symbol: '',
    description: '',
    logo: '',
    twitter: '',
    website: '',
    telegram: ''
  });

  // Initialize ICP plugin
  useEffect(() => {
    const initializePlugin = async () => {
      try {
        const eliza = {
          registerPlugin: (plugin) => {
            // Plugin registration logic
            console.log('Plugin registered:', plugin);
          }
        };

        // Register the ICP plugin
        eliza.registerPlugin(icpPlugin);

        // Initialize wallet provider
        const { wallet } = await icpPlugin.providers.icpWalletProvider.get();
        setWallet(wallet);
      } catch (err) {
        setError('Failed to initialize ICP plugin: ' + err.message);
      }
    };

    initializePlugin();
  }, []);

  // Handle token creation
  const handleCreateToken = async () => {
    try {
      if (!wallet) {
        throw new Error('Wallet not initialized');
      }

      const result = await wallet.createMemeToken({
        ...tokenDetails
      });

      console.log('Token created successfully:', result);
      // Reset form after successful creation
      setTokenDetails({
        name: '',
        symbol: '',
        description: '',
        logo: '',
        twitter: '',
        website: '',
        telegram: ''
      });
    } catch (err) {
      setError('Failed to create token: ' + err.message);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTokenDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ICP Token Creator</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreateToken();
      }} className="space-y-4">
        <div>
          <label className="block mb-2">Token Name</label>
          <input
            type="text"
            name="name"
            value={tokenDetails.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Symbol</label>
          <input
            type="text"
            name="symbol"
            value={tokenDetails.symbol}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={tokenDetails.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={tokenDetails.logo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Social Links</label>
          <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            value={tokenDetails.twitter}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={tokenDetails.website}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="telegram"
            placeholder="Telegram"
            value={tokenDetails.telegram}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Token
        </button>
      </form>
    </div>
  );
};

export default Eliza;