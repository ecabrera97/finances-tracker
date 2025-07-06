import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          {exp.date} - {exp.type}: {exp.description} (${exp.amount})
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
