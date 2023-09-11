import React, { useState, useEffect } from 'react';
import SalesDetails from './SalesDetails';

function SalesList() {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/sales/');
      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaleClick = sale => {
    setSelectedSale(sale);
  };

  const handleDelete = async saleId => {
    try {
      const response = await fetch(`http://localhost:8090/api/sales/${saleId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchSales();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderSaleList = () => {
    return (
      <div className="row">
        {sales.map(sale => (
          <div className="col-md-4 mb-4" key={sale.automobile.vin}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{sale.employee_id}</h5>
                <p className="card-text">{sale.id}</p>
                <p className="card-text">{sale.salesperson.first_name} {sale.salesperson.last_name}</p>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(sale.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => handleSaleClick(sale)}
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
      <h1 className="display-4 text-center my-4">Sales</h1>
      {selectedSale ? (
        <div>
          <button
            className="btn btn-primary mb-2"
            onClick={() => setSelectedSale(null)}
          >
            Back to List
          </button>
          <SalesDetails sale={selectedSale} />
        </div>
      ) : (
        renderSaleList()
      )}
    </div>
  );
}

export default SalesList;
