
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditExpenseModal from './EditExpenseModal';
import './ExpenseList.css';

const ExpenseList = ({ expenses, editExpense, deleteExpense, wallet, setWallet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const openModal = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentExpense(null);
    setIsModalOpen(false);
  };

  const handleEdit = (updatedExpense) => {
    editExpense(updatedExpense);
    closeModal();
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount (₹)</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => openModal(expense)}><FaEdit /></button>
                  <button onClick={() => deleteExpense(expense.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <EditExpenseModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          expense={currentExpense}
          onSave={handleEdit}
          wallet={wallet}
          expenses={expenses}
        />
      )}
    </div>
  );
};

export default ExpenseList;
