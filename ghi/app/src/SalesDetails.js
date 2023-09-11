import React from 'react';

function SalesDetails({ sale }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{sale.id}</h5>
        <p className="card-text">Salesperson Employee ID: {sale.salesperson.employee_id}</p>
        <p className="card-text">Salesperson Name: {sale.salesperson.first_name} {sale.salesperson.last_name}</p>
        <p className="card-text">Customer: {sale.customer.first_name} {sale.customer.last_name}</p>
        <p className="card-text">VIN: {sale.automobile.vin}</p>
        <p className="card-text">Price: {sale.price}</p>
      </div>
    </div>
  );
}

export default SalesDetails;
