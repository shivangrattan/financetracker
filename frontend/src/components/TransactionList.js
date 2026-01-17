import React, { useState } from 'react';
import { format } from 'date-fns';
import './TransactionList.css';

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const getTypeColor = (type) => {
    return type === 'INCOME' ? '#4CAF50' : '#f44336';
  };

  const getTypeIcon = (type) => {
    return type === 'INCOME' ? '+' : '-';
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedTransactions = () => {
    const sorted = [...transactions].sort((a, b) => {
      let aValue, bValue;

      switch (sortColumn) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        case 'amount':
          aValue = parseFloat(a.amount);
          bValue = parseFloat(b.amount);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return <div className="no-transactions">No transactions found. Add one to get started!</div>;
  }

  return (
    <div className="transaction-list-container">
      <h2>Transactions</h2>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('date')}
                className="sortable"
                title="Click to sort"
              >
                Date{getSortIndicator('date')}
              </th>
              <th 
                onClick={() => handleSort('category')}
                className="sortable"
                title="Click to sort"
              >
                Category{getSortIndicator('category')}
              </th>
              <th 
                onClick={() => handleSort('type')}
                className="sortable"
                title="Click to sort"
              >
                Type{getSortIndicator('type')}
              </th>
              <th 
                onClick={() => handleSort('amount')}
                className="sortable"
                title="Click to sort"
              >
                Amount{getSortIndicator('amount')}
              </th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getSortedTransactions().map((transaction) => (
              <tr key={transaction.id}>
                <td>{format(new Date(transaction.date), 'MMM dd, yyyy')}</td>
                <td>{transaction.category}</td>
                <td>
                  <span
                    style={{
                      color: getTypeColor(transaction.type),
                      fontWeight: 'bold',
                    }}
                  >
                    {getTypeIcon(transaction.type)} {transaction.type}
                  </span>
                </td>
                <td
                  style={{
                    color: getTypeColor(transaction.type),
                    fontWeight: 'bold',
                  }}
                >
                  ₹{transaction.amount.toFixed(2)}
                </td>
                <td>{transaction.description || '-'}</td>
                <td className="actions">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this transaction?')) {
                        onDelete(transaction.id);
                      }
                    }}
                    className="delete-btn"
                  >
                    Delete
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

export default TransactionList;
