// GradeSelector.jsx
import React from 'react';

function GradeSelector({ id, label }) {
  return (
    <div className="row mt-4 me-2">
      <label htmlFor={id} className="col-6">{label}</label>
      <select id={id} className="col-6 rounded border border-dark">
        <option value="">Select Grade</option>
        <option value="O">O</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="U">U</option>
      </select>
    </div>
  );
}

export default GradeSelector;
