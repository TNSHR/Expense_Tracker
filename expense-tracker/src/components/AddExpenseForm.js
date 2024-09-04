
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import './AddExpenseForm.css';
import { v4 as uuidv4 } from 'uuid';

const AddExpenseForm = ({ wallet, addExpense }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) {
      enqueueSnackbar('Please fill all the fields', { variant: 'warning' });
      return;
    }
    if (parseFloat(amount) > wallet) {
      enqueueSnackbar('Insufficient wallet balance!', { variant: 'error' });
      return;
    }
    const expense = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    };
    addExpense(expense);
    enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Grocery"
          required
        />
      </div>
      <div className="form-group">
        <label>Amount (₹):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 500"
          required
          min="1"
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
