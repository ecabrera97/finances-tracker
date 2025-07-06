import React, { useState, useEffect } from 'react';


const API_URL = process.env.REACT_APP_API_URL


function ExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    date: '',
    amount: ''
  });

  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');

  // Fetch expense types on mount
  useEffect(() => {
    fetch(`${API_URL}/expenses-types`)
      .then(res => res.json())
      .then(data => setTypes(data));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ type: '', description: '', date: '', amount: '' });
  };

  const addNewType = async () => {
    if (!newType) return;
    const res = await fetch(`${API_URL}/expenses-types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: newType })
    });
    const created = await res.json();
    setTypes([...types, created]);
    setFormData(prev => ({ ...prev, type: created.type }));
    setNewType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" value={formData.type} onChange={handleChange} required>
        <option value="">Select a type</option>
        {types.map((t) => (
          <option key={t.type} value={t.type}>{t.type}</option>
        ))}
      </select>
      <div>
        <input
          placeholder="New type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
        <button type="button" onClick={addNewType}>Add Type</button>
      </div>

      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
