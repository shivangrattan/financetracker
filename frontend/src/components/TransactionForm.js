import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../api/transactionAPI';
import './TransactionForm.css';

const TransactionForm = ({ onTransactionSaved, editingTransaction }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'EXPENSE',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [categories, setCategories] = useState(['Food', 'Transport', 'Utilities', 'Entertainment', 'Salary', 'Bonus', 'Freelance']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        description: editingTransaction.description || '',
        date: editingTransaction.date,
      });
    }

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await transactionAPI.getAllCategories();
        if (response.data.length > 0) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log('Using default categories');
      }
    };

    fetchCategories();
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTransaction) {
        await transactionAPI.updateTransaction(editingTransaction.id, formData);
        alert('Transaction updated successfully!');
      } else {
        await transactionAPI.createTransaction(formData);
        alert('Transaction created successfully!');
      }
      onTransactionSaved();
      setFormData({
        amount: '',
        type: 'EXPENSE',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      alert('Error saving transaction: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form-container">
      <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            list="categories"
            required
          />
          <datalist id="categories">
            {categories.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Saving...' : editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
