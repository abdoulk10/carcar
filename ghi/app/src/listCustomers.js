import React, { useState, useEffect } from 'react';
import CustomerDetails from './CustomerDetails';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/customers/');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCustomerClick = customer => {
    setSelectedCustomer(customer);
  };

  const handleDelete = async customerId => {
    try {
      const response = await fetch(`http://localhost:8090/api/customers/${customerId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCustomers();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderCustomerList = () => {
    return (
      <div className="row">
        {customers.map(customer => (
          <div className="col-md-4 mb-4" key={customer.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{customer.last_name}</h5>
                <p className="card-text">{customer.first_name}</p>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => handleCustomerClick(customer)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center my-4">Customers</h1>
      {selectedCustomer ? (
        <div>
          <button
            className="btn btn-primary mb-2"
            onClick={() => setSelectedCustomer(null)}
          >
            Back to List
          </button>
          <CustomerDetails customer={selectedCustomer} />
        </div>
      ) : (
        renderCustomerList()
      )}
    </div>
  );
}

export default CustomerList;
