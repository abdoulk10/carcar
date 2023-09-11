import React from 'react';

function CustomerDetails({ customer }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{customer.id}</h5>
        <p className="card-text">First Name: {customer.first_name}</p>
        <p className="card-text">Last Name: {customer.last_name}</p>
        <p className="card-text">Address: {customer.address}</p>
        <p className="card-text">Phone Number: {customer.phone_number}</p>
      </div>
    </div>
  );
}

export default CustomerDetails;
