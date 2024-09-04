
import React from 'react';
import { FaWallet } from 'react-icons/fa';
import './Header.css';

const Header = ({ wallet }) => {
  return (
    <header className="header">
      <h1><FaWallet /> Expense Tracker</h1>
      <div className="wallet">
        Wallet Balance: ₹{wallet.toFixed(2)}
      </div>
    </header>
  );
};

export default Header;
