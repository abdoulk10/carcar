import React, { useState, useEffect } from 'react';

function RecordSales() {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedAutomobile, setSelectedAutomobile] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchUnsoldAutomobiles();
    fetchSalespeople();
    fetchCustomers();
  }, []);

  const fetchUnsoldAutomobiles = async () => {
    try {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSalespeople = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/salesperson/');
      if (response.ok) {
        const data = await response.json();
        setSalespeople(data.salesperson);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salesRecord = {
      automobile: selectedAutomobile,
      salesperson: selectedSalesperson,
      customer: selectedCustomer,
      price: parseFloat(price),
    };

    try {
      const response = await fetch('http://localhost:8090/api/sales/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salesRecord),
      });

      if (response.ok) {
        console.log('Sale recorded successfully!');
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Record a new sale</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Automobile VIN</label>
          <select
            value={selectedAutomobile}
            onChange={(e) => setSelectedAutomobile(e.target.value)}
          >
            <option value="">Choose an automobile VIN...</option>
            {automobiles.map((automobile) => {
              if (!automobile.sold) {
                return (
                  <option key={automobile.vin} value={automobile.vin}>
                    {automobile.vin}
                  </option>
                );
              }
              return null;
            }
            )}
          </select>
        </div>
        <div>
          <label>Salesperson</label>
          <select
            value={selectedSalesperson}
            onChange={(e) => setSelectedSalesperson(e.target.value)}
          >
            <option value="">Choose a salesperson...</option>
            {salespeople.map((salesperson) => (
              <option key={salesperson.employee_id} value={salesperson.employee_id}>
                {salesperson.employee_id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Customer</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Choose a customer...</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
}

export default RecordSales;
