
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import './AddIncomeForm.css';

const AddIncomeForm = ({ addIncome }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [income, setIncome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || parseFloat(income) <= 0) {
      enqueueSnackbar('Please enter a valid amount', { variant: 'warning' });
      return;
    }
    addIncome(parseFloat(income));
    enqueueSnackbar('Income added successfully!', { variant: 'success' });
    setIncome('');
  };

  return (
    <form className="income-form" onSubmit={handleSubmit}>
      <h2>Add Income</h2>
      <div className="form-group">
        <label>Amount (₹):</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g., 1000"
          required
          min="1"
        />
      </div>
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncomeForm;
