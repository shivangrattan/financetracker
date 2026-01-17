import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import './BalanceChart.css';

const BalanceChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    if (transactions.length === 0) {
      return [];
    }

    // Sort transactions by date
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Group all transactions by date
    const dateMap = new Map();
    sorted.forEach((transaction) => {
      if (!dateMap.has(transaction.date)) {
        dateMap.set(transaction.date, []);
      }
      dateMap.get(transaction.date).push(transaction);
    });

    // Calculate running balance, income, and expenses
    const data = [];
    let runningBalance = 0;
    let cumulativeIncome = 0;
    let cumulativeExpense = 0;

    // Process sorted dates
    const sortedDates = Array.from(dateMap.keys()).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    sortedDates.forEach((date) => {
      const dayTransactions = dateMap.get(date);
      
      // Sum all transactions for this day
      dayTransactions.forEach((transaction) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === 'INCOME') {
          runningBalance += amount;
          cumulativeIncome += amount;
        } else {
          runningBalance -= amount;
          cumulativeExpense += amount;
        }
      });

      data.push({
        date: format(parseISO(date), 'MMM dd'),
        fullDate: date,
        balance: parseFloat(runningBalance.toFixed(2)),
        income: parseFloat(cumulativeIncome.toFixed(2)),
        expense: parseFloat(cumulativeExpense.toFixed(2)),
      });
    });

    return data;
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="balance-chart-container">
        <h3>Balance Over Time</h3>
        <p className="no-data">No transactions to display chart</p>
      </div>
    );
  }

  return (
    <div className="balance-chart-container">
      <h3>Balance Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Balance (₹)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            formatter={(value) => `₹${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={{ fill: '#4CAF50', r: 3 }}
            activeDot={{ r: 5 }}
            name="Cumulative Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f44336"
            strokeWidth={2}
            dot={{ fill: '#f44336', r: 3 }}
            activeDot={{ r: 5 }}
            name="Cumulative Expense"
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2196F3"
            strokeWidth={2}
            dot={{ fill: '#2196F3', r: 4 }}
            activeDot={{ r: 6 }}
            name="Running Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
