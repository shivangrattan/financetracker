import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../api/transactionAPI';
import BalanceChart from './BalanceChart';
import './Dashboard.css';

const Dashboard = ({ transactions }) => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    calculateStats();
  }, [transactions]);

  const calculateStats = () => {
    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'INCOME') {
        income += parseFloat(transaction.amount);
      } else {
        expense += parseFloat(transaction.amount);
      }
    });

    setStats({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Financial Summary</h1>
      <div className="stats-grid">
        <div className="stat-card income">
          <h3>Total Income</h3>
          <p className="stat-value">₹{stats.totalIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card expense">
          <h3>Total Expenses</h3>
          <p className="stat-value">₹{stats.totalExpense.toFixed(2)}</p>
        </div>
        <div className={`stat-card balance ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
          <h3>Balance</h3>
          <p className="stat-value">₹{stats.balance.toFixed(2)}</p>
        </div>
      </div>
      <BalanceChart transactions={transactions} />
    </div>
  );
};

export default Dashboard;
