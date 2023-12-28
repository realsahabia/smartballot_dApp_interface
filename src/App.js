import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    let web3;

    async function loadAccount() {
      if (window.ethereum) {
        // Modern dapp browsers
        web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.enable();
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        // Legacy dapp browsers
        web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        // Non-dapp browsers
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    }

    async function loadBalance() {
      try {
        const networkType = await web3.eth.net.getNetworkType();
        const balance = await web3.eth.getBalance(account);

        setNetwork(networkType);
        setBalance(balance);
      } catch (error) {
        console.error('Error loading balance:', error);
      }
    }

    loadAccount();
    loadBalance();
  }, [account, network, balance]);

  return (
    <div className="App">
      <header className="App-header">
        Decentralized Ballot
        <p>
          Account: {account}
        </p>
        <p>
          Your balance ({network}): {balance}
        </p>
      </header>
    </div>
  );
}

export default App;
