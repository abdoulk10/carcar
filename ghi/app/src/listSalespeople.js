import React, { useState, useEffect } from 'react';
import SalespersonDetails from './SalespersonDetails';

function SalespersonList() {
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);

  useEffect(() => {
    fetchSalespeople();
  }, []);

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

  const handleSalespersonClick = salesperson => {
    setSelectedSalesperson(salesperson);
  };

  const handleDelete = async salespersonId => {
    try {
      const response = await fetch(`http://localhost:8090/api/salesperson/${salespersonId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchSalespeople();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderSalespeopleList = () => {
    return (
      <div className="row">
        {salespeople.map(salesperson => (
          <div className="col-md-4 mb-4" key={salesperson.employee_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{salesperson.last_name}</h5>
                <p className="card-text">{salesperson.first_name}</p>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(salesperson.employee_id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => handleSalespersonClick(salesperson)}
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
      <h1 className="display-4 text-center my-4">Salespeople</h1>
      {selectedSalesperson ? (
        <div>
          <button
            className="btn btn-primary mb-2"
            onClick={() => setSelectedSalesperson(null)}
          >
            Back to List
          </button>
          <SalespersonDetails salesperson={selectedSalesperson} />
        </div>
      ) : (
        renderSalespeopleList()
      )}
    </div>
  );
}

export default SalespersonList;
