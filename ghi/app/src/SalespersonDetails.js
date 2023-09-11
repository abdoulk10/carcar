import React from 'react';

function SalespersonDetails({ salesperson }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{salesperson.employee_id}</h5>
        <p className="card-text">Employee ID: {salesperson.employee_id}</p>
        <p className="card-text">First Name: {salesperson.first_name}</p>
        <p className="card-text">Last Name: {salesperson.last_name}</p>
      </div>
    </div>
  );
}

export default SalespersonDetails;
