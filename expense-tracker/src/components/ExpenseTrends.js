
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ExpenseTrends.css';

const ExpenseTrends = ({ expenses }) => {
  const data = [];
  const categories = [...new Set(expenses.map(exp => exp.category))];
  categories.forEach(cat => {
    const total = expenses
      .filter(exp => exp.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
    data.push({ category: cat, amount: total });
  });

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#8dd1e1'];

  return (
    <div className="expense-trends">
      <h2>Expense Trends</h2>
      {data.length === 0 ? (
        <p>No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseTrends;
