import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';


const API_URL = process.env.REACT_APP_API_URL


function App() {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    const res = await fetch(`${API_URL}/expenses`);
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add new expense to backend
  const addExpense = async (expense) => {
    const res = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    });

    if (res.ok) {
      fetchExpenses(); // Refresh list
    }
  };

  return (
    <div>
      <h1>Finance Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;

