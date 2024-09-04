
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ExpenseSummary.css';

const ExpenseSummary = ({ expenses }) => {
  const data = [];
  const categories = [...new Set(expenses.map(exp => exp.category))];
  categories.forEach(cat => {
    const total = expenses
      .filter(exp => exp.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
    data.push({ name: cat, value: total });
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#AA83FA'];

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>
      {data.length === 0 ? (
        <p>No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseSummary;
