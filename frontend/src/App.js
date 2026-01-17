import React, { useState, useEffect } from 'react';
import { transactionAPI } from './api/transactionAPI';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await transactionAPI.getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Make sure the backend is running on http://localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionSaved = () => {
    fetchTransactions();
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await transactionAPI.deleteTransaction(id);
      alert('Transaction deleted successfully!');
      fetchTransactions();
    } catch (error) {
      alert('Error deleting transaction: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>💰 Finance Tracker</h1>
          <p>Personal Finance Management System</p>
        </div>
      </header>

      <main className="app-main">
        <Dashboard transactions={transactions} />
        <TransactionForm 
          onTransactionSaved={handleTransactionSaved}
          editingTransaction={editingTransaction}
        />
        {editingTransaction && (
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
        <TransactionList 
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
