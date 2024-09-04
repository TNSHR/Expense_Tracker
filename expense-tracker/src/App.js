
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddExpenseForm from './components/AddExpenseForm';
import AddIncomeForm from './components/AddIncomeForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends';
import { SnackbarProvider } from 'notistack';
import { getData, setData } from './utils/localStorage';
import './App.css';

function App() {
  const [wallet, setWallet] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedWallet = getData('wallet');
    const storedExpenses = getData('expenses');
    if (storedWallet !== null) setWallet(storedWallet);
    if (storedExpenses !== null) setExpenses(storedExpenses);
  }, []);

  // Update localStorage whenever wallet or expenses change
  useEffect(() => {
    setData('wallet', wallet);
  }, [wallet]);

  useEffect(() => {
    setData('expenses', expenses);
  }, [expenses]);

  // Add Expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setWallet(wallet - parseFloat(expense.amount));
  };

  // Edit Expense
  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    const oldExpense = expenses.find((e) => e.id === updatedExpense.id);
    setExpenses(updatedExpenses);
    setWallet(wallet + parseFloat(oldExpense.amount) - parseFloat(updatedExpense.amount));
  };

  // Delete Expense
  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find((e) => e.id === id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
    setWallet(wallet + parseFloat(expenseToDelete.amount));
  };

  // Add Income
  const addIncome = (income) => {
    setWallet(wallet + parseFloat(income));
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Header wallet={wallet} />
        <div className="container">
          <div className="forms">
            <AddExpenseForm wallet={wallet} addExpense={addExpense} />
            <AddIncomeForm addIncome={addIncome} />
          </div>
          <div className="lists">
            <ExpenseList
              expenses={expenses}
              editExpense={editExpense}
              deleteExpense={deleteExpense}
              wallet={wallet}
              setWallet={setWallet}
            />
            <ExpenseSummary expenses={expenses} />
            <ExpenseTrends expenses={expenses} />
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
